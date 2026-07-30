/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["'Space Grotesk'", "serif"],
      sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
      mono: ["'JetBrains Mono'", "monospace"],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "#f97316",
          soft: "#fed7aa",
        },
      },
      boxShadow: {
        glow: "0 0 35px rgba(249, 115, 22, 0.35)",
        overlay: "0 25px 80px rgba(2, 6, 23, 0.6)",
      },
    },
    screens: {
      xs: "340px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },

  plugins: [],
};
