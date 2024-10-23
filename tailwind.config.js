/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#fea000",
        dark:"#739552",
        light:"#ebecd0",
        selection: "#D4A6F2",
      }
    },
  },
  plugins: [],
}
