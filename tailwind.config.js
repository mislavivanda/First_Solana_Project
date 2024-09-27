module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
      },

      animation: {
        fade: "fade 1s ease-in-out",
      },

      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },

      colors: {
        "hover-select": {
          DEFAULT: "#f6f6f7",
        },
        "input-color": {
          DEFAULT: "#F3F3F3",
        },
        "pagination-select": {
          DEFAULT: "#dddddd",
        },
        "primary-color": {
          //light: '#642dfd',
          DEFAULT: "#642dfd",
          //dark: '#642dfd',
        },
        "font-color": {
          dark: "#141414",
          DEFAULT: "#141414",
          light: "#505050",
        },
        "button-classic": {
          DEFAULT: "#EFEFEF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
