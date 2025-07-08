/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.600rem',
        base: '0.8rem',
        xl: '1.066rem',
        '2xl': '1.421rem',
        '3xl': '1.894rem',
        '4xl': '2.525rem',
        '5xl': '3.366rem',
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        'text': '#e2e8f0',
        'text-secondary': '#54D2CC',
        'background': '#030611',
        'primary': '#2c77d8',
        'secondary': '#181a20',
        'accent': '#46ce91',
        'navbar': '#0f172a',
      },
      animation: {
        'gradient-x': 'gradientX 4s ease-in-out infinite',
      },
      keyframes: {
        gradientX: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function hexToRgb(hex) {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `${r}, ${g}, ${b}`;
      }

      const primary = theme('colors.primary');
      const accent = theme('colors.accent');

      addBase({
        ':root': {
          '--color-primary': primary,
          '--color-primary-rgb': hexToRgb(primary),
          '--color-accent': accent,
          '--color-accent-rgb': hexToRgb(accent),
          '--color-text': theme('colors.text'),
          '--color-text-rgb': hexToRgb(theme('colors.text')),
          '--color-background': theme('colors.background'),
          '--color-background-rgb': hexToRgb(theme('colors.background')),
          '--font-body': theme('fontFamily')['body'].join(', '),
          '--font-heading': theme('fontFamily')['heading'].join(', '),
        },
      });
    }
  ],
}
