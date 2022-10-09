/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},

    colors: {
      primary: '#1B3351',
      black: '#000',
      secondary: '#23C647',
      tertiary: '#E6E8E6',
      fourth: '#DF2935',
      fifth: '#E6E8E6',
      sixth: '#C0C0C0',
      seventh: '#0A66CE',
      eighth: '#f4f4f5',
      nineth: '#e0f2fe',
      white : '#fff'
    },

    fontFamily: {
      inter : ['Inter', 'sans-serif']
    }
  },
  plugins: [],
}