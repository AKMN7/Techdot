/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        darkPurple: '#2c2c38',
        veryDarkPurple: '#21212D',
        lightGrey: '#cecece',
        darkGrey: '#333333',
        primary: '#D65A31',
        lightBG: '#EEEEEE',
        darkBG: '#393E46',
        verydarkBG: '#222831',

      }
    },
  },
  darkMode: 'class',
  plugins: [],
}