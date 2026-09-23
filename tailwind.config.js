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
      // Nâng cỡ chữ nhỏ nhất cho dễ đọc trên điện thoại (mặc định 12px → 13px)
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.15rem' }],
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
