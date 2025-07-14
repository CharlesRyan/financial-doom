/**
 * Type definitions for the Financial Doom Calculator
 */

/** Form data structure for retirement calculation inputs */
export interface FormData {
  currentAge: string;
  retirementAge: string;
  currentSavings: string;
  monthlyContribution: string;
  returnRate: string;
  desiredSpending: string;
}

/** Structure for fortune events that can modify retirement savings */
export interface FortuneEvent {
  description: string;
  modifier: number;
}

/** Collection of fortune events organized by impact type */
export interface FortuneEvents {
  JACKPOT: FortuneEvent[];
  GOOD: FortuneEvent[];
  BAD: FortuneEvent[];
  CATASTROPHIC: FortuneEvent[];
}

/** Types of fortune events */
export type FortuneType = keyof FortuneEvents;

/** Levels of financial doom based on retirement sustainability */
export type DoomLevel = 'SAFE' | 'CONCERNING' | 'DOOMED' | 'CATASTROPHIC';

/** Doom messages organized by doom level */
export interface DoomMessages {
  SAFE: string[];
  CONCERNING: string[];
  DOOMED: string[];
  CATASTROPHIC: string[];
}

/** Result of a fortune event */
export interface Fortune {
  type: FortuneType;
  event: FortuneEvent;
  modifiedAmount: number;
}

/** Complete calculation result with doom assessment */
export interface CalculationResult {
  savedAmount: number;
  yearsLasting: number;
  doomLevel: DoomLevel;
  message: string;
  fortune?: Fortune;
}

// Type guard to check if a value is a valid FormData key
export const isFormDataKey = (key: string): key is keyof FormData => {
  return ['currentAge', 'retirementAge', 'currentSavings', 'monthlyContribution', 'returnRate', 'desiredSpending'].includes(key);
};

// Helper function to safely convert string to number
export const safeParseNumber = (value: string, fallback: number = 0): number => {
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
};
