/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}", // Additional paths
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // Black
        secondary: "var(--color-secondary)", // White
        text: "var(--color-text)", // Black
        background: "var(--color-bg)", // Dark White
        foreground: "var(--foreground)", // Additional color from the original file
      },
    },
  },
  plugins: [],
};
