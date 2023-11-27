import { plugin, type Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}'],
  safelist: [
    'h-main',
    'text-guru', 'bg-guru', 'border-guru',
    'text-advanced', 'bg-advanced', 'border-advanced',
    'text-intermediate', 'bg-intermediate', 'border-intermediate',
    'text-junior', 'bg-junior', 'border-junior',
    'text-newbie', 'bg-newbie', 'border-newbie',
    'text-html', 'text-css', 'text-js', 'text-api', 'text-svelte'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },

    fontFamily: {
      barlow: ['Barlow', 'sans-serif']
    },

    colors: {
      guru: '#ED2C49',
      advanced: '#F48925',
      intermediate: '#F1B604',
      junior: '#AAD742',
      newbie: '#6ABECD',

      html: '#6ABECD',
      css: '#3E54A3',
      js: '#CF6390',
      api: '#AAD742',
      svelte: '#FF3E00',

      gray: {
        100: '#FAFAFA',
        200: '#F0F4F4',
        300: '#DBE5E6'
      },

      black: '#1C2022',
      white: '#FFFFFF',
      transparent: 'transparent'
    },

    extend: {}
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.h-main': {
          height: 'calc(100vh - 240px)',

          '@media screen and (min-width: 768px)': {
            height: 'calc(100vh - 206px)'
          },

          '@media screen and (min-width: 1024px)': {
            height: 'calc(100vh - 222px)'
          }
        },

        '@media screen and (pointer: fine)': {
          '.transition-colorize': {
            filter: 'grayscale(100%)',
            transition: 'transform 300ms, filter 300ms ease-in-out',

            '&:hover': {
              filter: 'grayscale(0)',
              transform: 'scale(1.05)'
            }
          }
        }
      })
    })
  ]
}

export default config
