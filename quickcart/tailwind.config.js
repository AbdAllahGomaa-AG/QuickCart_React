import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        purple: "#634C9F",
        orangeMain: "#EA580C",
        "light-text": "#6B7280",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [flowbite],
};
