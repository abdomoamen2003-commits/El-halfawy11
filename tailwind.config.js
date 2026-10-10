/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (taken 1:1 from the original website)
        brand: "#38A6BD",
        accent: "#EC9510",
        teal: {
          50: "#EAF6F9",
          600: "#177E96",
          800: "#0F4A5A",
          900: "#0A3641",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
