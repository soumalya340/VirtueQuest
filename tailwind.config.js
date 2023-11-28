/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      primary: ['Inter', 'sans-serif'],
      analog: ['AnalogFont', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1200px',
      xl: '1728px',
    },
    extend: {
      backgroundImage: {
        gradient: "url('/cover.png')",
        grad: 'var(--background-gradient)',
        gradtrans: 'var(--background-gradient-trans)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '@font-face': {
          fontFamily: 'AnalogFont',
          src: 'url("/fonts/analog-font.ttf") format("truetype")',
        },
        body: {
          fontFamily: theme('fontFamily.analog'),
        },
      });
    },
  ],
};
