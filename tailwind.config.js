const { cubicBezier } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce_slow: 'bounce_slow 1.5s ease-in-out infinite',
      },
      keyframes: {
        bounce_slow: {
          '0%, 100%': { 
            transform: "translateY(-3%)",
            AnimationTimeline: "cubicBezier(0.8,0,1,1)"
          },
          '50%': {
            transform: "translateY(0)",
            AnimationTimeline: "cubicBezier(0,0,0.2,1)"
          },
        }
      }
    },
  },
  plugins: [],
}