/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        "brand-color-3":
          "linear-gradient(207.92deg, #0398f2 11.42%, #38b9e7 106.55%)",
      },
      colors: {
        lightPrimary: "#F4F7FA",
        colorText: "#d1d3d5",
        colorText2: "#1d2630",
        blue: "#0c9ef1",
        darkgrey: "#1b232d",
        darkPrimary: "#131920",
        darkComponet: "#263240",
        darkSideBar: "#1b232d",
        darkTextGreyColor: "#f4f5f5",
        primary: "#2E3192"
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 0.5s ease-out forwards",
        fadeInUp: "fadeInUp 0.5s ease-out 0.2s forwards",
        spin: "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};