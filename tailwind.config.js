/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        darkGreen: '#08231F',
        deepGreen: '#0B2C26',
        mainGreen: '#123D34',
        accentGreen: '#174F43',
        gold: '#D4A74E',
        lightGold: '#EAD39D',
        goldCream: '#F5EAD2',
        cream: '#F8F4E9',
        warmCream: '#F1E8D6',
        textGreen: '#103B32',
        secondary: '#64736D',
      },
      boxShadow: {
        soft: '0 14px 34px rgba(8, 35, 31, 0.08)',
      },
    },
  },
  plugins: [],
}
