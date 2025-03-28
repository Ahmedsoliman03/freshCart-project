module.exports = {
  darkMode: 'class', // This enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Amazon colors
        'amazon-dark': '#131921',
        'amazon-secondary': '#232F3E',
        'amazon-border': '#37475A',
        'amazon-light': '#EAEDED',
        'amazon-orange': '#FF9900',
        // Light mode equivalents
        'light-primary': '#FFFFFF',
        'light-secondary': '#F3F3F3',
        'light-text': '#111111',
      },
    },
  },

}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
