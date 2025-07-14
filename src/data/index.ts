/**
 * Data for fortune events and doom messages
 */

import type { FortuneEvents, DoomMessages } from '../types';

// Fortune modifying events
export const FORTUNE_EVENTS: FortuneEvents = {
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
export const DOOM_MESSAGES: DoomMessages = {
  SAFE: [
    "Well, well, well... looks like someone's been eating avocado toast responsibly! 🥑",
    'Oh great, another responsible adult making the rest of us look bad. 🙄',
    'Your financial future is brighter than my screen at 3 AM. 😎',
    'You\'re coasting toward retirement like it\'s a beach vacation. Must be nice. 🏖️',
    'Keep it up and you might even afford hobbies other than screaming internally. 🎨',
  ],
  CONCERNING: [
    'Hope you like ramen noodles in your golden years! 🍜',
    'Maybe start a TikTok account as your backup retirement plan? 📱',
    'Your retirement plan is about as solid as a chocolate teapot. ☕',
    'Solid plan—if you die at 68 and eat mostly lentils. 🥄',
    'You\'re basically one avocado toast away from doom. Watch yourself. 🥴',
  ],
  DOOMED: [
    'WELCOME TO THE FINANCIAL THUNDERDOME! 🔥',
    "Ever considered becoming a professional cat sitter? It's not too late! 😺",
    'Your retirement plan is basically just playing the lottery at this point. 🎰',
    'Your only retirement option is faking your death and moving to Uruguay. 🛫',
    "You're not just screwed—you're artisanal, small-batch, hand-crafted f*cked. 🪓",
  ],
  CATASTROPHIC: [
    'ALERT: FINANCIAL DUMPSTER FIRE DETECTED! 🗑️🔥',
    'Have you considered retiring on Mars? It might be cheaper! 🚀',
    "Your financial future is darker than a black hole's Instagram feed! 🕳️",
    "This isn't a retirement strategy, it's a financial snuff film. 🎞️",
    'You\'ll retire when capitalism collapses. So… never, but also tomorrow. ⏳',
  ],
};
