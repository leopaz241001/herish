/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '35': '8.75rem',
        '30': '7.5rem',
        '25': '6.25rem',
        '15': '3.75rem',
        '13': '3.25rem',
        '7.5': '1.875rem',
      },
      borderRadius: {
        '20': '1.25rem',
      }
    },
    colors: {
      transparent: 'transparent',
      'primary': '#665BAF',
      'primary-hover': '#5C50A5',
      'primary-hover-ui': '#E7E6FE',
      'secondary': '#AF6C9B',
      'secondary-hover': '#A55F91',
      'secondary-hover-ui': '#F8E2F0',
      'feature': '#212E37',
      'features': '#504CFE',
      'placehover': '#b1b1b1',
      'line': '#e4e4e4',
      'neutral': '#F0F0F3',
      'black': '#1C2024',
      'white': '#fff',
      'error': '#eb4d4d',
      'success': '#37B853',
      'warning': '#F4AA1A',
      'background': '#eef7f7',
      'text-primary': '#6257AA',
      'text-low': '#767A84',
    },
  },
  plugins: [],
}