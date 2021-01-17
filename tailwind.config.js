module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        footer: '100px 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
