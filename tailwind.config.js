// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path is correct
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C3BFF",
        accent1: "#F8AFA6",
        accent2: "#D1A9FF",
        background: "#FAF7FF",
        textDark: "#2A2A2A",
        textLight: "#FFFFFF",
        secondaryBg: "#EFE6FF",
      },
    },
  },
  plugins: [],
}
