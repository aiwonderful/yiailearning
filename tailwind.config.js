/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['var(--font-inter)', 'sans-serif'],
      // },
      typography: {
        DEFAULT: {
          css: {
            a: {
              '&:hover': {
                opacity: 0.85,
              },
            },
            code: {
              color: 'var(--primary-rgb)',
              backgroundColor: 'rgba(var(--muted-rgb), 0.5)',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: ['class', '[data-theme="dark"]'],
} 