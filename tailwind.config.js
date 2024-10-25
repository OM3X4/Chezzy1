/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xl: "960px",
        lg: "800px",
        md: "745px",
        sm: "200px",
      },
      colors:{
        primary:"#fea000",
        dark:"#739552",
        light:"#ebecd0",
        selection: "#c5e137",
        trail: "#c5e137",
      }
    },
  },
  plugins: [],
}
