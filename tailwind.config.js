/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: "24px",
    },

    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },

    extend: {
      colors: {
        "dark-blue-500": "hsl(209, 23%, 22%)",
        "dark-blue-600": "hsl(207, 26%, 17%)",
        "dark-blue-700": "hsl(200, 15%, 8%)",
        "dark-gray-500": "hsl(0, 0%, 52%)",
        "dark-gray-600": "hsl(0, 0%, 97%)",
      },
      boxShadow: {
        "dark-box-shadow": "0 0 6px 8px hsl(207, 26%, 17%)",
        "light-box-shadow": "0 0 6px 8px #eee",
      },
      gridTemplateColumns: {
        "large-devices": "repeat(auto-fill, minmax(236px, 236px))",
      },
    },
  },
  plugins: [],
};
