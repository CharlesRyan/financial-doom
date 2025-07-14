import React, { useState } from 'react';
import './styles/App.css';

const DEV_MODE = true; // Toggle this to enable/disable dev mode

const getRandomFormData = () => {
  const currentAge = Math.floor(Math.random() * (60 - 20) + 20); // 20-60 years old
  const retirementAge = currentAge + Math.floor(Math.random() * (40 - 5) + 5); // 5-40 years from current age
  const currentSavings = Math.floor(Math.random() * 200000); // 0-200k savings
  const monthlyContribution = Math.floor(Math.random() * (2000 - 100) + 100); // $100-2000 monthly
  const returnRate = (Math.floor(Math.random() * 10) / 2 + 3).toString(); // 3-8% in 0.5% increments
  const desiredSpending = Math.floor(Math.random() * (100000 - 30000) + 30000); // 30k-100k annual spending

  return {
    currentAge: currentAge.toString(),
    retirementAge: retirementAge.toString(),
    currentSavings: currentSavings.toString(),
    monthlyContribution: monthlyContribution.toString(),
    returnRate,
    desiredSpending: desiredSpending.toString()
  };
};

// Fortune modifying events
const FORTUNE_EVENTS = {
  JACKPOT: [
    { description: 'Got your foot run over by a mail truck! Hello, settlement money! 📬', modifier: 2000000 },
    { description: "Congratulations! You're Elon's newest baby momma! 👶", modifier: 5000000 },
    { description: 'Your cat became a successful Instagram influencer! 😺', modifier: 1000000 },
    { description: 'Found out your weird uncle was secretly a Bitcoin billionaire! 🎰', modifier: 3000000 },
    { description: 'Your collection of vintage Beanie Babies finally paid off! 🧸', modifier: 1500000 },
  ],
  GOOD: [
    { description: 'Won a lifetime supply of ramen noodles! Saved $50/year! 🍜', modifier: 100000 },
    { description: "Inherited a suspicious monkey's paw, sold it on eBay! 🐒", modifier: 250000 },
    { description: 'Your TikTok dance went viral! Hello sponsorships! 💃', modifier: 500000 },
    { description: 'Found $20 in an old jacket! (Investment compounds for 40 years) 🧥', modifier: 300000 },
  ],
  BAD: [
    { description: 'Your AI assistant became sentient and sued for back pay! 🤖', modifier: -500000 },
    { description: 'Invested your savings in a pyramid scheme... literally a pyramid! 🏛️', modifier: -400000 },
    { description: 'Started a podcast... negative ROI on expensive equipment 🎙️', modifier: -200000 },
    { description: "Accidentally liked your boss's Instagram post from 2015 😱", modifier: -300000 },
  ],
  CATASTROPHIC: [
    { description: "Class action lawsuit from everyone you've given dirty looks to! 😠", modifier: -1000000 },
    { description: 'Your NFT collection is now worth less than your student loans 🖼️', modifier: -800000 },
    { description: "Signed up for a gym membership you'll never cancel... EVER! 💪", modifier: -600000 },
    { description: 'Got scammed by a Nigerian prince (who was actually from Cleveland) 👑', modifier: -750000 },
  ],
};

// Outcome messages based on doom level
const DOOM_MESSAGES = {
  SAFE: [
    "Well, well, well... looks like someone's been eating avocado toast responsibly! 🥑",
    'Oh great, another responsible adult making the rest of us look bad. 🙄',
    'Your financial future is brighter than my screen at 3 AM. 😎',
    'You’re coasting toward retirement like it’s a beach vacation. Must be nice. 🏖️',
    'Keep it up and you might even afford hobbies other than screaming internally. 🎨',
  ],
  CONCERNING: [
    'Hope you like ramen noodles in your golden years! 🍜',
    'Maybe start a TikTok account as your backup retirement plan? 📱',
    'Your retirement plan is about as solid as a chocolate teapot. ☕',
    'Solid plan—if you die at 68 and eat mostly lentils. 🥄',
    'You’re basically one avocado toast away from doom. Watch yourself. 🥴',
  ],
  DOOMED: [
    'WELCOME TO THE FINANCIAL THUNDERDOME! 🔥',
    "Ever considered becoming a professional cat sitter? It's not too late! 😺",
    'Your retirement plan is basically just playing the lottery at this point. 🎰',
    'Your only retirement option is faking your death and moving to Uruguay. 🛫',
    "You’re not just screwed—you're artisanal, small-batch, hand-crafted f*cked. 🪓",
  ],
  CATASTROPHIC: [
    'ALERT: FINANCIAL DUMPSTER FIRE DETECTED! 🗑️🔥',
    'Have you considered retiring on Mars? It might be cheaper! 🚀',
    "Your financial future is darker than a black hole's Instagram feed! 🕳️",
    "This isn't a retirement strategy, it's a financial snuff film. 🎞️",
    'You’ll retire when capitalism collapses. So… never, but also tomorrow. ⏳',
  ],
};

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    returnRate: '5',
    desiredSpending: '',
  });

  const [result, setResult] = useState<{
    savedAmount: number;
    yearsLasting: number;
    doomLevel: keyof typeof DOOM_MESSAGES;
    message: string;
    fortune?: {
      type: keyof typeof FORTUNE_EVENTS;
      event: { description: string; modifier: number };
      modifiedAmount: number;
    };
  } | null>(null);

  const calculateCompoundInterest = (principal: number, monthlyContribution: number, ratePercent: number, years: number): number => {
    const rate = ratePercent / 100;
    const monthlyRate = rate / 12;
    const months = years * 12;

    let total = principal;
    for (let i = 0; i < months; i++) {
      total = (total + monthlyContribution) * (1 + monthlyRate);
    }

    return Math.round(total);
  };

  const getDoomLevel = (yearsLasting: number): keyof typeof DOOM_MESSAGES => {
    if (yearsLasting >= 30) return 'SAFE';
    if (yearsLasting >= 20) return 'CONCERNING';
    if (yearsLasting >= 10) return 'DOOMED';
    return 'CATASTROPHIC';
  };

  const getRandomMessage = (doomLevel: keyof typeof DOOM_MESSAGES): string => {
    const messages = DOOM_MESSAGES[doomLevel];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Only update live if we already have an initial calculation
    if (result && Object.values(newFormData).every((val) => val !== '')) {
      calculateResult(newFormData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every((val) => val !== '')) {
      calculateResult(formData);
    }
  };

  const calculateResult = (data: typeof formData) => {
    const yearsToRetirement = Number(data.retirementAge) - Number(data.currentAge);
    const savedAmount = calculateCompoundInterest(Number(data.currentSavings), Number(data.monthlyContribution), Number(data.returnRate), yearsToRetirement);

    const annualWithdrawal = Number(data.desiredSpending);
    const withdrawalRate = (annualWithdrawal / savedAmount) * 100;
    const yearsLasting = Math.round((100 / withdrawalRate) * 4);

    const doomLevel = getDoomLevel(yearsLasting);
    const message = getRandomMessage(doomLevel);

    setResult({
      savedAmount,
      yearsLasting,
      doomLevel,
      message,
    });
  };

  const pullSlotMachine = () => {
    if (!result) return;

    // Random number between 0 and 100
    const chance = Math.random() * 100;
    let fortuneType: keyof typeof FORTUNE_EVENTS;

    // 5% chance of jackpot, 15% good, 50% bad, 30% catastrophic
    if (chance < 5) fortuneType = 'JACKPOT';
    else if (chance < 20) fortuneType = 'GOOD';
    else if (chance < 70) fortuneType = 'BAD';
    else fortuneType = 'CATASTROPHIC';

    const events = FORTUNE_EVENTS[fortuneType];
    const event = events[Math.floor(Math.random() * events.length)];
    const modifiedAmount = result.savedAmount + event.modifier;

    // Recalculate years lasting with new amount
    const withdrawalRate = (Number(formData.desiredSpending) / modifiedAmount) * 100;
    const yearsLasting = Math.round((100 / withdrawalRate) * 4);

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
              <input type='range' name='returnRate' value={formData.returnRate || '5'} onChange={handleInputChange} min='3' max='8' step='0.5' required />
              <div className='slider-value'>{formData.returnRate || '5'}%</div>
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
