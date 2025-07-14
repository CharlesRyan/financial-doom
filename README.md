# Financial Doom Calculator 💀💰

**🌐 Live Demo: [https://financial-doom.netlify.app/](https://financial-doom.netlify.app/)**

This was a fun little weekend project to brush up on TypeScript best practices and create a financial planning tool that's hard to find elsewhere. In spite of the cheeky name and hyperbolic commentary, it's actually a genuinely useful retirement planning calculator.

## What is Financial Doom?

Financial Doom is just lighthearted retirement calculator. While most financial planning tools are dry and boring, this app delivers your financial reality with a dose of humor and some optional twists of fate. It performs legitimate retirement calculations based on compound interest, withdrawal rates, and realistic financial projections. The user also has the option to play with fate. After the financial projection is calculated, a button appears that, once clicked, randomly applies a financial scenario that could either be a windfall or a wipeout.

## Features

### Core Calculations
- **Retirement Planning**: Calculate how long your savings will last based on your desired spending
- **Compound Interest**: Accurate projections using configurable return rates (3-8% annually)
- **Monthly Contributions**: Factor in ongoing savings contributions
- **Withdrawal Rate Analysis**: Uses the 4% rule and other withdrawal rate calculations

### Unique Elements
- **Doom Level Assessment**: Get categorized into SAFE, CONCERNING, DOOMED, or CATASTROPHIC levels
- **Fortune Events**: Random life events that could impact your financial future (both positive and negative)
- **Sassy Messaging**: Brutally honest feedback about your financial situation
- **Interactive Sliders**: Smooth, responsive controls for adjusting return rates

## How It Works

1. **Input Your Data**: Enter your current age, retirement age, savings, monthly contributions, expected return rate, and desired annual spending
2. **Get Your Assessment**: The app calculates how many years your money will last and assigns you a "doom level"
3. **Experience Fortune**: Random events might modify your projections (because life happens!)
4. **Plan Accordingly**: Use the results to adjust your savings strategy

## Doom Level Categories

- **SAFE** (30+ years): You're financially secure! 🎉
- **CONCERNING** (20-30 years): Some adjustments needed 😰
- **DOOMED** (10-20 years): Time for drastic changes! 💀
- **CATASTROPHIC** (<10 years): Emergency mode activated! 🚨

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd financial-doom

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with modern features
- **Type Safety**: Comprehensive TypeScript definitions

## Configuration

The app includes configurable constants in `src/constants/index.ts`:

- Return rate ranges (3-8% with 0.5% steps)
- Doom level thresholds
- Fortune event probabilities
- Mathematical constants for calculations

## Why "Financial Doom"?

Most financial planning tools are intimidatingly serious or overly optimistic. Financial Doom takes a different approach – it tells you the truth about your financial situation with humor and memorable scenarios. The app's personality makes financial planning more engaging while still providing accurate, actionable insights.

## Contributing

This was a weekend project, but contributions are welcome! Please feel free to:
- Report bugs
- Suggest new fortune events
- Improve the UI/UX
- Add new calculation features

## License

ISC License - feel free to use this code for your own projects!

---

*Remember: While this app uses humor to deliver financial insights, the underlying calculations are based on established financial planning principles. Always consult with a financial advisor for personalized advice.*
