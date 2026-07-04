import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f7",
          100: "#ffe4ea",
          200: "#ffccd9",
          300: "#ffa3bc",
          400: "#ff6b96",
          500: "#f43f73",
          600: "#e11d5a",
          700: "#be1248",
          800: "#9d1040",
          900: "#84103a",
          950: "#4a0320",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e9ede4",
          200: "#d3dbc9",
          300: "#b3c2a2",
          400: "#8fa476",
          500: "#708759",
          600: "#596c45",
          700: "#455538",
          800: "#38452e",
          900: "#2f3927",
          950: "#171e13",
        },
        cream: {
          50: "#fdfcf8",
          100: "#faf7ef",
          200: "#f4edd9",
          300: "#ecdfbb",
          400: "#e2cc96",
          500: "#d6b870",
          600: "#c79f55",
          700: "#a78045",
          800: "#88653c",
          900: "#6f5434",
          950: "#3b2b18",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-lato)", "system-ui", "sans-serif"],
        accent: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "floral-pattern": "url('/images/patterns/floral-bg.svg')",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
        card: "0 1px 3px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.05)",
        luxury: "0 25px 50px -12px rgba(176, 46, 95, 0.15)",
        glow: "0 0 20px rgba(244, 63, 115, 0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;