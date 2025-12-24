/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B", // Amber-500
        "primary-hover": "#D97706", // Amber-600
        "background-light": "#F9FAFB", // Gray-50
        "background-dark": "#111827", // Gray-900
        "card-light": "#FFFFFF",
        "card-dark": "#1F2937", // Gray-800
        "text-main-light": "#1F2937",
        "text-main-dark": "#F9FAFB",
        "text-sub-light": "#6B7280",
        "text-sub-dark": "#9CA3AF",
      },
      fontFamily: {
        display: ["'Noto Sans SC'", "sans-serif"],
        body: ["'Noto Sans SC'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.15)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}