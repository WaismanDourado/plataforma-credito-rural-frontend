/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx, mdx}",
    "./components/**/*.{js,ts,jsx,tsx, mdx}",
    "./app/**/*.{js,ts,jsx,tsx, mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rural-green": "#228B22",
        "credit-blue": "#007AFF",
      },

      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
