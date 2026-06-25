/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        meadow: '#1f8a70',
        coral: '#f06449',
        mist: '#f6f8fb',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(23, 32, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
