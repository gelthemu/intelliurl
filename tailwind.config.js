/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#264653",
        teal: "#2dd493",
        sand: "#e9c46a",
        light: "#ffffff",
      },
    },
  },
  plugins: [],
};
