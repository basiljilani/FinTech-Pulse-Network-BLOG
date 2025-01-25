/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src-2-frontend/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
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
      transformOrigin: {
        'right': 'right',
        'left': 'left',
      },
      rotate: {
        '90': '90deg',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
