/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightPrimary: "#F4F7FA",
        darkPrimary: "#131920",
        darkComponet: "#263240",
        darkSideBar: "#1b232d",
        darkTextGreyColor:"#f4f5f5"
      },
      animation: {
        spin: 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
