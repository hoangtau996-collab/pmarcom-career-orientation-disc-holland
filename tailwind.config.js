/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        disc: {
          d: '#EF4444', // Red for Dominance
          i: '#F59E0B', // Yellow/Amber for Influence
          s: '#10B981', // Green for Steadiness
          c: '#3B82F6', // Blue for Conscientiousness
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
