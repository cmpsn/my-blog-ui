module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: 
      '"Noto Sans", "Segoe UI", Roboto, Helvetica, Oxygen, "Droid Sans", -apple-system, Ubuntu, Arial, "Fira Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        primary: {
          extralight: '#F3F0FB',
          superlight: '#E7E2F8',
          light: '#C4B5FD',
          DEFAULT: '#7C3AED', 
          dark: '#4C1D95',
        },
        secondary: {
          light: '#6EE7B7',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
        preTagBackground: '#2d2d2d',
        borderColorForMath: '#858c99'
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms'
      },
      boxShadow(theme) {
        return {
          dark: {
            css: {
              none: theme('none')
            }
          }
        }
      },
      borderColor: theme => ({
        DEFAULT: theme('colors.borderColorForMath'),
       }),
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              pre: {
                backgroundColor: theme('colors.preTagBackground'),
                marginTop: '0.35em',
                marginBottom: '0.75em',
                borderRadius: '0.375rem',
                paddingTop: '1em',
                paddingRight: '1em',
                paddingBottom: '1em',
                paddingLeft: '1em',
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.400')
              },
              thead: {
                borderBottomColor: theme('colors.gray.400')
              },
              table: {
                fontSize: '0.75em'
              },
            }
          },
          lg: {
            css: {
              pre: {
                backgroundColor: theme('colors.preTagBackground'),
                marginTop: '0.5em',
                marginBottom: '1em',
                borderRadius: '0.5rem',
                paddingTop: '1em',
                paddingRight: '1em',
                paddingBottom: '1em',
                paddingLeft: '1em',
              },
              table: {
                fontSize: '0.75em'
              },
            }
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              a: {
                color: theme('colors.green.500'),
                '&:hover': {
                    color: theme('colors.green.500'),
                },
              },

              h1: {
                color: theme('colors.gray.300'),
              },
              h2: {
                color: theme('colors.gray.300'),
              },
              h3: {
                color: theme('colors.gray.300'),
              },
              h4: {
                color: theme('colors.gray.300'),
              },
              h5: {
                color: theme('colors.gray.300'),
              },
              h6: {
                color: theme('colors.gray.300'),
              },

              strong: {
                color: theme('colors.gray.300'),
              },

              code: {
                color: theme('colors.gray.300'),
              },

              figcaption: {
                color: theme('colors.gray.500'),
              },

              blockquote: {
                color: theme('colors.gray.300'),
              },

              thead: {
                color: theme('colors.gray.300'),
              },

            }
          }
        }
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"], 
      typography: ["dark"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
