// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DCB93E',
        secondary: '#8FC63F',
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

