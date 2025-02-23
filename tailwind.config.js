/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 'none',
            hr: {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              marginTop: '2em',
              marginBottom: '2em',
            },
            'h1, h2, h3, h4': {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            pre: {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#93c5fd',
            },
            code: {
              color: '#93c5fd',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};