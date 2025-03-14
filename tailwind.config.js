/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Add custom dark theme colors
        darkbg: '#0a0a0a',
        darkprimary: '#121212',
        darksecondary: '#1e1e1e',
        darkaccent: '#2d2d2d',
        darkborder: '#333333',
      },
      backgroundColor: {
        dark: {
          primary: '#121212',
          secondary: '#1e1e1e',
          accent: '#2d2d2d',
        }
      },
    },
  },
  plugins: [],
}
