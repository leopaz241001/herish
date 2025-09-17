/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '35': '8.75rem',
        '30': '7.5rem',
        '25': '6.25rem',
        '17': '4.25rem',
        '15': '3.75rem',
        '13': '3.25rem',
        '7.5': '1.875rem',
      },
      fontSize: {
        'head1': ['72px', { lineHeight: '88px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head2': ['48px', { lineHeight: '56px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head3': ['36px', { lineHeight: '44px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head4': ['28px', { lineHeight: '36px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head5': ['24px', { lineHeight: '32px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head6': ['20px', { lineHeight: '28px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'body1': ['18px', { lineHeight: '28px' }],
        'body2': ['16px', { lineHeight: '24px' }],
        'body3': ['14px', { lineHeight: '20px' }],
        'head1-mo': ['32px', { lineHeight: '40px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head2-mo': ['24px', { lineHeight: '32px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head3-mo': ['24px', { lineHeight: '32px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head4-mo': ['20px', { lineHeight: '28px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head5-mo': ['16px', { lineHeight: '24px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'head6-mo': ['12px', { lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: 600 }],
        'body1-mo': ['16px', { lineHeight: '24px' }],
        'body2-mo': ['16px', { lineHeight: '24px' }],
        'body3-mo': ['14px', { lineHeight: '20px' }],
      },
      borderRadius: {
        '20': '1.25rem',
      }
    },
    colors: {
      /* primary */ 
      'primary': '#665BAF',
      'primary-hover': '#5C50A5',
      'primary-txt': '#6257AA',
      'primary-txt-head': '#2F2956',
      'primary-hover-ui': '#E7E6FE',
      'primary-ui': '#F2F1FD',

      /* secondary */ 
      'secondary': '#AF6C9B',
      'secondary-hover': '#A55F91',
      'secondary-txt': '#9B5A88',
      'secondary-txt-head': '#5B204C',
      'secondary-hover-ui': '#F8E2F0',
      'secondary-ui': '#FCEEF7',
      
      /* neutral */ 
      'neutral': '#8B8D98',
      'neutral-hover': '#7E818B',
      'neutral-txt-low': '#767B84',
      'neutral-txt-high': '#1C2024',
      'neutral-hover-ui': '#E8E8EC',
      'neutral-ui': '#F0F0F3',
      
      /* success */ 
      'success': '#22C55E',
      'success-hover': '#00B250',
      'success-txt': '#118D57',
      'success-txt-head': '#065E49',
      'success-hover-ui': '#8BEE9C',
      'success-ui': '#DBF5DB',
      
      /* error */ 
      'error': '#F94346',
      'error-hover': '#EA2931',
      'error-txt': '#C31324',
      'error-txt-head': '#6C0421',
      'error-hover-ui': '#FECDCE',
      'error-ui': '#FFE9EA',

      'black': '#1C2024',
      'white': '#ffffff',
      transparent: 'transparent',
    },
  },
  plugins: []
}