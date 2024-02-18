/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  prefix: 'video-',
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1},
          '100%': { opacity: 0,
            transform: 'scale(2)'
            },
        },
      },
      animation: {
        'fadeout': 'fadeOut 0.5s linear 1 normal forwards',
      },
    },
  },
  plugins: [],
}

