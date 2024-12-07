import { plugin } from 'shared/config/tailwindcss'
import type { Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}', './node_modules/shared/components/*.astro'],
  safelist: ['border-error'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },

    fontFamily: {
      'space-grotesk': ['Space Grotesk', 'sans-serif'],
    },

    colors: {
      error: 'hsl(0, 100%, 66%)',
      violet: 'hsl(278, 94%, 30%)',
      gray: 'hsl(210, 12%, 71%)',

      'very-dark-violet': 'hsl(278, 68%, 11%)',
      'very-light-violet': 'hsl(249, 99%, 64%)',
      'dark-grayish-violet': 'hsl(279, 6%, 55%)',
      'light-grayish-violet': 'hsl(270, 3%, 87%)',

      black: 'hsl(0, 0%, 18%)',
      white: 'hsl(0, 0%, 100%)',
      transparent: 'transparent',
    },

    extend: {
      backgroundImage: {
        'main-mobile': "url('/frontendmentor/interactive-card-details-form/images/bg-main-mobile.png')",
        'card-front': "url('/frontendmentor/interactive-card-details-form/images/bg-card-front.png')",
      },
    },
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.bg-credit-card-back': {
          background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(222,221,223,1) 100%)',
        },
      })
    }),
  ],
}

export default config
