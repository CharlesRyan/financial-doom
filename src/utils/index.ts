/**
 * Utility functions for the Financial Doom Calculator
 */

import type { FormData } from '../types';

/**
 * Generates random form data for development/testing purposes
 * @returns FormData with randomized values
 */
export const getRandomFormData = (): FormData => {
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
