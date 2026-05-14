/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fbfa',
          100: '#ccf3ef',
          200: '#99e7df',
          300: '#5fd3c8',
          400: '#2eb8ac',
          500: '#159b91',
          600: '#0d7c75',
          700: '#0d6360',
          800: '#0f4e4d',
          900: '#0f4140',
        },
      },
      boxShadow: {
        elegant: '0 10px 30px -10px rgba(13, 124, 117, 0.25)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0d7c75, #2eb8ac)',
      },
    },
  },
  plugins: [],
};
