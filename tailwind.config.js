/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        fontFamily: {
          serif: ['"Instrument Serif"', "Georgia", "serif"],
          sans: ["Inter", "system-ui", "sans-serif"],
        },
      },
    },
    plugins: [],
  };