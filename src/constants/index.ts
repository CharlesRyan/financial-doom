/**
 * Configuration constants
 */


export const DEV_MODE = false; // Toggle this to enable/disable dev mode

// Return rate slider configuration
export const RETURN_RATE_MIN = 3;
export const RETURN_RATE_MAX = 8;
export const RETURN_RATE_STEP = 0.5;
export const DEFAULT_RETURN_RATE = '5';

// Doom level thresholds (in years)
export const DOOM_THRESHOLDS = {
  SAFE: 30,
  CONCERNING: 20,
  DOOMED: 10,
} as const;

// Fortune event probabilities (cumulative percentages)
export const FORTUNE_PROBABILITIES = {
  JACKPOT: 5,
  GOOD: 20,
  BAD: 70,
  CATASTROPHIC: 100,
} as const;

// Mathematical constants for calculations
export const CALCULATION_CONSTANTS = {
  WITHDRAWAL_RATE_MULTIPLIER: 4,
  MONTHS_PER_YEAR: 12,
  PERCENTAGE_MULTIPLIER: 100,
} as const;
