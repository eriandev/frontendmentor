import { plugin, type Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}', './node_modules/shared/components/*.astro'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },

    colors: {
      'very-dark-gray': 'hsl(0, 0%, 17%)',
      'dark-gray': 'hsl(0, 0%, 59%)',
      gray: 'hsl(0, 0%, 85%)',

      black: 'hsl(0, 0%, 15%)',
      white: 'hsl(0, 0%, 100%)',
      transparent: 'transparent',
    },

    extend: {
      backgroundImage: {
        'pattern-mobile': "url('/frontendmentor/ip-address-tracker/images/pattern-bg-mobile.png')",
        'pattern-desktop': "url('/frontendmentor/ip-address-tracker/images/pattern-bg-desktop.png')",
      },
    },
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          'font-size': '18px',
        },
      })
    }),
  ],
}

export default config
