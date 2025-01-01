/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src-2-frontend/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'article-bg': '#282828',
        'article-text': '#E0E0E0',
        'article-heading': '#FFFFFF',
        'article-accent': '#333333',
        'article-highlight': '#404040',
        'article-border': '#404040',
        'article-link': '#E0E0E0',
        'article-card': '#333333',
      },
      animation: {
        blob: 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      utilities: {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
      },
    },
  },
  plugins: [], // Add Tailwind plugins here if required
};
