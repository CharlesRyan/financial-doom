import React, { useState, useRef, useEffect } from 'react';
import './styles/App.css';

import type { 
  FormData, 
  CalculationResult, 
  DoomLevel, 
  FortuneType 
} from './types';
import { isFormDataKey, safeParseNumber } from './types';
import {
  DEV_MODE,
  RETURN_RATE_MIN,
  RETURN_RATE_MAX,
  RETURN_RATE_STEP,
  DEFAULT_RETURN_RATE,
  DOOM_THRESHOLDS,
  FORTUNE_PROBABILITIES,
  CALCULATION_CONSTANTS,
} from './constants';
import { FORTUNE_EVENTS, DOOM_MESSAGES } from './data';
import { getRandomFormData } from './utils';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    returnRate: DEFAULT_RETURN_RATE,
    desiredSpending: '',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [sliderValuePosition, setSliderValuePosition] = useState<number>(50); // Default to 50% (middle)

  /**
   * Calculates the position of the slider value display based on the current value
   */
  const calculateSliderPosition = (value: string): number => {
    const numValue = parseFloat(value);
    const percentage = ((numValue - RETURN_RATE_MIN) / (RETURN_RATE_MAX - RETURN_RATE_MIN)) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
  };

  /**
   * Updates the slider value position when the return rate changes
   */
  useEffect(() => {
    const position = calculateSliderPosition(formData.returnRate || DEFAULT_RETURN_RATE);
    setSliderValuePosition(position);
  }, [formData.returnRate]);

  /**
   * Calculates compound interest with monthly contributions
   * @param principal - Initial investment amount
   * @param monthlyContribution - Monthly contribution amount
   * @param ratePercent - Annual interest rate as percentage
   * @param years - Number of years to compound
   * @returns Total amount after compound interest
   */
  const calculateCompoundInterest = (principal: number, monthlyContribution: number, ratePercent: number, years: number): number => {
    const rate = ratePercent / CALCULATION_CONSTANTS.PERCENTAGE_MULTIPLIER;
    const monthlyRate = rate / CALCULATION_CONSTANTS.MONTHS_PER_YEAR;
    const months = years * CALCULATION_CONSTANTS.MONTHS_PER_YEAR;

    let total = principal;
    for (let i = 0; i < months; i++) {
      total = (total + monthlyContribution) * (1 + monthlyRate);
    }

    return Math.round(total);
  };

  const getDoomLevel = (yearsLasting: number): DoomLevel => {
    if (yearsLasting >= DOOM_THRESHOLDS.SAFE) return 'SAFE';
    if (yearsLasting >= DOOM_THRESHOLDS.CONCERNING) return 'CONCERNING';
    if (yearsLasting >= DOOM_THRESHOLDS.DOOMED) return 'DOOMED';
    return 'CATASTROPHIC';
  };

  const getRandomMessage = (doomLevel: DoomLevel): string => {
    const messages = DOOM_MESSAGES[doomLevel];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    if (!isFormDataKey(name)) {
      console.warn(`Unknown form field: ${name}`);
      return;
    }
    
    const newFormData: FormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Only update live if we already have an initial calculation
    if (result && Object.values(newFormData).every((val) => val !== '')) {
      calculateResult(newFormData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Object.values(formData).every((val) => val !== '')) {
      calculateResult(formData);
    }
  };

  const calculateResult = (data: FormData): void => {
    const yearsToRetirement = safeParseNumber(data.retirementAge) - safeParseNumber(data.currentAge);
    const savedAmount = calculateCompoundInterest(
      safeParseNumber(data.currentSavings), 
      safeParseNumber(data.monthlyContribution), 
      safeParseNumber(data.returnRate), 
      yearsToRetirement
    );

    const annualWithdrawal = safeParseNumber(data.desiredSpending);
    const withdrawalRate = (annualWithdrawal / savedAmount) * CALCULATION_CONSTANTS.PERCENTAGE_MULTIPLIER;
    const yearsLasting = Math.round((CALCULATION_CONSTANTS.PERCENTAGE_MULTIPLIER / withdrawalRate) * CALCULATION_CONSTANTS.WITHDRAWAL_RATE_MULTIPLIER);

    const doomLevel = getDoomLevel(yearsLasting);
    const message = getRandomMessage(doomLevel);

    setResult({
      savedAmount,
      yearsLasting,
      doomLevel,
      message,
    });
  };

  const pullSlotMachine = (): void => {
    if (!result) return;

    const chance = Math.random() * 100;
    let fortuneType: FortuneType;

    if (chance < FORTUNE_PROBABILITIES.JACKPOT) fortuneType = 'JACKPOT';
    else if (chance < FORTUNE_PROBABILITIES.GOOD) fortuneType = 'GOOD';
    else if (chance < FORTUNE_PROBABILITIES.BAD) fortuneType = 'BAD';
    else fortuneType = 'CATASTROPHIC';

    const events = FORTUNE_EVENTS[fortuneType];
    const event = events[Math.floor(Math.random() * events.length)];
    const modifiedAmount = result.savedAmount + event.modifier;

    // Recalculate years lasting with new amount
    const withdrawalRate = (safeParseNumber(formData.desiredSpending) / modifiedAmount) * CALCULATION_CONSTANTS.PERCENTAGE_MULTIPLIER;
    const yearsLasting = Math.round((CALCULATION_CONSTANTS.PERCENTAGE_MULTIPLIER / withdrawalRate) * CALCULATION_CONSTANTS.WITHDRAWAL_RATE_MULTIPLIER);

    const newDoomLevel = getDoomLevel(yearsLasting);

    setResult({
      ...result,
      savedAmount: modifiedAmount,
      yearsLasting,
      doomLevel: newDoomLevel,
      message: getRandomMessage(newDoomLevel),
      fortune: {
        type: fortuneType,
        event,
        modifiedAmount,
      },
    });
  };

  // DEV MODE: Auto-fill form with random data
  React.useEffect(() => {
    if (DEV_MODE) {
      const randomData = getRandomFormData();
      setFormData(randomData);
      calculateResult(randomData);
    }
  }, []);

  // Initialize slider position on mount
  useEffect(() => {
    const initialPosition = calculateSliderPosition(formData.returnRate || DEFAULT_RETURN_RATE);
    setSliderValuePosition(initialPosition);
  }, []); // Empty dependency array to run only on mount

  return (
    <div className='container'>
      <header>
        <h1>💀 Retirement Doom Calculator 💀</h1>
        <p>Find out just how financially doomed you really are!</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>
            Current Age
            <input type='number' name='currentAge' value={formData.currentAge} onChange={handleInputChange} min='0' max='120' required />
          </label>

          <label>
            Retirement Age
            <input type='number' name='retirementAge' value={formData.retirementAge} onChange={handleInputChange} min='0' max='120' required />
          </label>
        </div>

        <div className='input-group'>
          <label>
            Current Savings ($)
            <input type='number' name='currentSavings' value={formData.currentSavings} onChange={handleInputChange} min='0' required />
          </label>

          <label>
            Monthly Contribution ($)
            <input type='number' name='monthlyContribution' value={formData.monthlyContribution} onChange={handleInputChange} min='0' required />
          </label>
        </div>

        <div className='input-group'>
          <label className='slider-label'>
            Slider Bar of Optimism (Annual Return %)
            <div className='slider-container'>
              <input 
                ref={sliderRef}
                type='range' 
                name='returnRate' 
                value={formData.returnRate || DEFAULT_RETURN_RATE} 
                onChange={handleInputChange} 
                min={RETURN_RATE_MIN} 
                max={RETURN_RATE_MAX} 
                step={RETURN_RATE_STEP} 
                required 
              />
              <div 
                className='slider-value' 
                style={{ left: `${sliderValuePosition}%` }}
              >
                {formData.returnRate || DEFAULT_RETURN_RATE}%
              </div>
              <div className='slider-labels'>
                <span>😰 Conservative</span>
                <span>Optimistic 🚀</span>
              </div>
            </div>
          </label>

          <label>
            Desired Annual Spending ($)
            <input type='number' name='desiredSpending' value={formData.desiredSpending} onChange={handleInputChange} min='0' required />
          </label>
        </div>

        <button type='submit'>Calculate Financial Doom 🔮</button>
      </form>

      {result && (
        <div className={`result ${result.doomLevel.toLowerCase()}`}>
          <h2>Your Financial Fate:</h2>
          <p className='saved-amount'>
            You'll have saved: <span>${result.savedAmount.toLocaleString()}</span>
          </p>
          <p className='years-lasting'>
            Your money will last approximately: <span>{result.yearsLasting} years</span>
          </p>
          <p className='doom-message'>{result.message}</p>

          {!result.fortune && (
            <div className='slot-machine'>
              <button onClick={pullSlotMachine} className='slot-button'>
                🎰 Try Your Luck! 🎰
              </button>
              <p className='slot-disclaimer'>Warning: May significantly improve or destroy your financial future!</p>
            </div>
          )}

          {result.fortune && (
            <div className={`fortune-result ${result.fortune.type.toLowerCase()}`}>
              <h3>Plot Twist! 🎲</h3>
              <p className='fortune-description'>{result.fortune.event.description}</p>
              <p className='fortune-impact'>
                Financial Impact:{' '}
                <span className={result.fortune.event.modifier > 0 ? 'positive' : 'negative'}>
                  {result.fortune.event.modifier > 0 ? '+' : ''}
                  {result.fortune.event.modifier.toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      <footer>
        <p>* Based on the 4% withdrawal rule. Not financial advice. Please consult a real advisor! 😅</p>
      </footer>
    </div>
  );
};

export default App;
