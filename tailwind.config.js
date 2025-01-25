/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx}",
    "./public/**/*.html",
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #e5e7eb'
            },
            'thead': {
              backgroundColor: '#f9fafb'
            },
            'th, td': {
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              textAlign: 'left'
            },
            'th': {
              fontWeight: '600',
              color: '#111827'
            },
            'tr:nth-child(even)': {
              backgroundColor: '#f9fafb'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}