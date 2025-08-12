/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#ff0000',
          'red-dark': '#cc0000',
          'red-light': '#ff3333',
        },
        gray: {
          850: '#1a1a1a',
          950: '#0a0a0a',
        },
      },
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'youtube': ['Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'youtube': '0 4px 16px rgba(255, 0, 0, 0.15)',
        'youtube-lg': '0 8px 32px rgba(255, 0, 0, 0.2)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    // Line clamp is now included by default in Tailwind CSS v3.3+
  ],
  darkMode: ['class', '[data-theme="dark"]'],
}
