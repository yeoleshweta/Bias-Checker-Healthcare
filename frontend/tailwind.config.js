/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-hover": "hsl(var(--primary-hover) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-hover": "hsl(var(--secondary-hover) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        danger: "hsl(var(--danger) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        neutral: {
          50: "hsl(var(--neutral-50) / <alpha-value>)",
          100: "hsl(var(--neutral-100) / <alpha-value>)",
          200: "hsl(var(--neutral-200) / <alpha-value>)",
          300: "hsl(var(--neutral-300) / <alpha-value>)",
          400: "hsl(var(--neutral-400) / <alpha-value>)",
          500: "hsl(var(--neutral-500) / <alpha-value>)",
          600: "hsl(var(--neutral-600) / <alpha-value>)",
          700: "hsl(var(--neutral-700) / <alpha-value>)",
          800: "hsl(var(--neutral-800) / <alpha-value>)",
          900: "hsl(var(--neutral-900) / <alpha-value>)",
          950: "hsl(var(--neutral-950) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        premium: "var(--shadow-premium)",
      },
    },
  },
  plugins: [],
};
