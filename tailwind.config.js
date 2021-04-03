module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: [
      "./src/**/*.{html,ts}",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

