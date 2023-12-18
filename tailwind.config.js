/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",

  theme: {
    extend: {
      fontFamily: {
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
