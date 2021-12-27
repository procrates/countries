module.exports = {
  darkMode: 'class',
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1440px'
      },
      width: {
        desktop: '1440px'
      },
      height: {
        '128': '32rem',
        '144': '36rem'
      },
      colors: {
        mode: {
          dark: {
            'dark-blue': 'hsl(209, 23%, 22%)',
            'very-dark-blue': 'hsl(207, 26%, 17%)',
            'white': 'hsl(0, 0%, 100%)'
          },
          light: {
            'very-dark-blue': 'hsl(0, 0%, 100%)',
            'dark-gray': 'hsl(0, 0%, 52%)',
            'very-light-gray': 'hsl(0, 0%, 98%)'
          }
        }
      },
      fontFamily: {
        'nunito-sanse': "'Nunito Sans', sans-serif"
      }
    },
  },
  plugins: [
  ],
}
