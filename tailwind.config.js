/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFEAEA",
        secondary: "#1A3D5E"
      },
      fontFamily: {
        playfair: ['Raleway', 'serif'],
      },
    },
  },
  plugins: [],
}

// #FC8EAC