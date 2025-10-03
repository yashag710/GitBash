/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // example blue
        background: {
          light: "#ffffff",
          dark: "#121212"
        },
        surface: {
          light: "#f3f4f6",
          dark: "#1f1f1f"
        },
        text: {
          light: "#000000",
          dark: "#ffffff"
        }
      }
    },
  },
  plugins: [],
};
