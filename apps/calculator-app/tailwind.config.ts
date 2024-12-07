import type { Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}', './node_modules/shared/components/*.astro'],

  safelist: ['border-key-secondary-dark bg-key-secondary-light', 'border-key-tertiary-dark bg-key-tertiary-light'],

  darkMode: 'class',

  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    extend: {
      fontFamily: {
        'league-spartan': ['League Spartan', 'sans-serif'],
      },

      colors: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',

        color: {
          main: 'var(--main-color)',
          keypad: 'var(--keypad-color)',
          screen: 'var(--screen-color)',
        },

        key: {
          primary: {
            light: 'var(--key-primary-light)',
            dark: 'var(--key-primary-dark)',
          },

          secondary: {
            light: 'var(--key-secondary-light)',
            dark: 'var(--key-secondary-dark)',
          },

          tertiary: {
            light: 'var(--key-tertiary-light)',
            dark: 'var(--key-tertiary-dark)',
          },
        },
      },
    },
  },

  plugins: [],
}

export default config
