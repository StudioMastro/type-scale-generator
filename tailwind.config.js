/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.2s ease-in-out",
        "fade-out": "fade-out 0.2s ease-in-out",
        "zoom-in": "zoom-in 0.2s ease-in-out",
        "zoom-out": "zoom-out 0.2s ease-in-out",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-in-out",
        "slide-out-to-top": "slide-out-to-top 0.2s ease-in-out",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-in-out",
        "slide-out-to-left": "slide-out-to-left 0.2s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-to-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10%)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-10%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
