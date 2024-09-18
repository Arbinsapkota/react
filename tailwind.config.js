/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      '2xl': { 'max': '1536px' },
      'xl': { 'max': '1280px' },
      'lg': { 'max': '1024px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '620px' },
    },
    extend: {
      fontFamily:{
        poppins:["Poppins", "sans-serif"]
      },
      animation: {
        head: ' 4s ease ',
        fadeUp: 'fadeUp 0.5s ease-in-out',
        fadeDown: 'fadeDown 0.5s ease-in-out',
      },
      keyframes: {
        border: {
          '0%': { border: '4px solid black' },
          '100%': { border: '12px solid green' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        },
      },
    
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))'
      },
    
    }


  },
  plugins: [
 
    require("tailwindcss-animate"),
  ],
});

