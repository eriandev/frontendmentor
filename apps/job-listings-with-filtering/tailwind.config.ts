import { plugin, type Config } from 'shared/config/tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html}', './node_modules/shared/components/*.astro'],
  theme: {
    screens: {
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      'league-spartan': ['League Spartan', 'sans-serif'],
    },

    extend: {
      colors: {
        'desaturated-dark-cyan': 'hsl(180, 29%, 50%)',

        'light-grayish-cyan': 'hsl(180, 52%, 96%)',
        'very-light-grayish-cyan': 'hsl(180, 31%, 95%)',

        'dark-grayish-cyan': 'hsl(180, 8%, 52%)',
        'very-dark-grayish-cyan': 'hsl(180, 14%, 20%)',
      },
    },
  },

  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.badge': {
          display: 'flex',

          '& .label': {
            lineHeight: '1',
            display: 'flex',
            fontWeight: '700',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '0 0.5rem',
            width: 'max-content',
            alignItems: 'center',
            paddingTop: '0.375rem',
            borderRadius: '0.375rem',
            height: theme('spacing.8'),
            color: theme('colors.desaturated-dark-cyan'),
            backgroundColor: theme('colors.very-light-grayish-cyan'),

            '&:hover': {
              color: theme('colors.white'),
              backgroundColor: theme('colors.desaturated-dark-cyan'),
            },
          },

          '& button': {
            display: 'none',
          },

          '&.filter': {
            '& .label': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',

              '&:hover': {
                color: theme('colors.desaturated-dark-cyan'),
                backgroundColor: theme('colors.very-light-grayish-cyan'),
              },
            },

            '& button': {
              display: 'block',
              fontWeight: '700',
              padding: '0 0.25rem',
              alignItems: 'center',
              height: theme('spacing.8'),
              color: theme('colors.white'),
              borderTopRightRadius: theme('borderRadius.lg'),
              borderBottomRightRadius: theme('borderRadius.lg'),
              backgroundColor: theme('colors.desaturated-dark-cyan'),

              '&:hover': {
                backgroundColor: theme('colors.very-dark-grayish-cyan'),
              },

              '& svg': {
                width: theme('spacing.5'),
                height: theme('spacing.5'),
              },
            },
          },
        },
      })
    }),
  ],
}

export default config
