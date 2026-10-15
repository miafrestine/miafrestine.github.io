/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      colors: {
        ink: "#171a2b",
        paper: "#f7f8fc",
        accent: "#6558f5",
      },
    },
  },
  plugins: [],
}
