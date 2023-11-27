import { plugin, type Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{astro,html}',
    './node_modules/shared/components/*.astro'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    container: {
      center: true,
      padding: {
        default: '1.5rem',
        xl: '4rem'
      }
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },

      colors: {
        'lime-green': 'hsl(163, 72%, 41%)',
        'bright-red': 'hsl(356, 69%, 56%)',
        'dark-blue': 'hsl(230, 17%, 14%)',

        'top-dark-blue': 'hsl(232, 19%, 15%)',
        'dark-desa-blue': 'hsl(228, 28%, 20%)',
        'desa-blue': 'hsl(228, 34%, 66%)',

        'pale-blue': 'hsl(225, 100%, 98%)',
        'light-gray-blue': 'hsl(227, 47%, 96%)',
        'dark-gray-blue': 'hsl(228, 12%, 44%)'
      },

      borderRadius: {
        '3xl': '1.25rem'
      }
    }
  },

  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addBase({
        ':root': {
          'font-size': '14px'
        }
      })

      addComponents({
        '.transition-standard': {
          'transition-property': 'color, background-color, border-color',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '400ms'
        },

        '.facebook': {
          '&:before': {
            background: 'hsl(208, 92%, 53%)'
          }
        },

        '.twitter': {
          '&:before': {
            background: 'hsl(203, 89%, 53%)'
          }
        },

        '.instagram': {
          '&:before': {
            background: 'linear-gradient(to right, hsl(37, 97%, 70%) 0%, hsl(329, 70%, 58%) 100%)'
          }
        },

        '.youtube': {
          '&:before': {
            background: 'hsl(348, 97%, 39%)'
          }
        }
      })
    })
  ]
}

export default config
