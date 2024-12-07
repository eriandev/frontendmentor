import type { Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}', './node_modules/shared/components/*.astro'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },

    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      opensans: ['Open Sans', 'sans-serif'],
    },

    extend: {
      fontSize: {
        '2xs': '.55rem',
      },

      colors: {
        'primary-dark': 'hsl(243, 87%, 12%)',
        'primary-desa': 'hsl(238, 22%, 44%)',

        'accent-blue': 'hsl(224, 93%, 58%)',
        'accent-green': 'hsl(170, 45%, 43%)',

        'neutral-blue': 'hsl(240, 75%, 98%)',
        'neutral-gray': 'hsl(0, 0%, 75%)',

        olive: 'hsl(228, 45%, 44%)',
      },
    },
  },

  plugins: [],
}

export default config
