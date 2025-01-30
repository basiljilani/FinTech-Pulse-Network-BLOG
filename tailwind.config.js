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
        'password-strength': {
          'weak': '#EF4444',    // red-500
          'fair': '#F97316',    // orange-500
          'good': '#EAB308',    // yellow-500
          'strong': '#84CC16',  // lime-500
          'very-strong': '#22C55E', // green-500
        },
      },
      animation: {
        blob: 'blob 10s infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite',
        shake: 'shake 0.6s ease-in-out',
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
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        }
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
