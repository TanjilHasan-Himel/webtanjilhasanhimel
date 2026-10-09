export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        }
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      }
    },
  },
  plugins: [],
}