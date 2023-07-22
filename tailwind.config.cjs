/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      width: {
        'p-90' : '90%',
        'p-98' : '98%',
      },
    },
  },
  plugins: [],
}
