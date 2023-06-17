/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
        },
          colors: {
              'snow': '#F5FEFD',
              'gunmetal': '#2C3539', // this is the trashiest name I've ever seen for a colour
              'paper': "#FFF2D7", // this is coffee cream
              'sky': "#A7D8E7", // this is sky blue
              'sky2': "#B9E9FC",
              "green": "#226F54",
              "cream": "#F4F0BB"
          },
        
          // that is animation class
          animation: {
              fade_in: 'fadeIn 2s ease-in-out',
              fade_out: 'fadeOut 2s ease-in-out',
          },
          // that is actual animation
          keyframes: theme => ({
              // I have no clue how to incorporate this with light/dark mode
              fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
              },
              fadeOut: {
                  '0%': { opacity: '1' },
                  '100%': { opacity: '0' },
              },
          }),
      },
    },
    plugins: [
      // require('@tailwindcss/typography'),
    ],
  }