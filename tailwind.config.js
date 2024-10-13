/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/index.html",
    "./layout/header.ejs",
    "./main.js",
    "./layout/footer.ejs",
    "./vite.config.js",
    "./postcss.config.js",
    "./layout/form.ejs",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#edfcfc",
        "primary-2": "#c5edf0",
        "primary-3": "#96dbe3",
        "primary-4": "#6bc8d6",
        "primary-5": "#44b3c9",
        "primary-6": "#219EBC",

        "secondary-1": "#219EBC",
        "secondary-2": "#219EBC",
        "secondary-3": "#219EBC",
        "secondary-4": "#219EBC",
        "secondary-5": "#219EBC",
        "secondary-6": "#219EBC",

        "lightgray-1": "#FAFAFA",
        "lightgray-2": "F5F5F5",
        "lightgray-3": "#EEEEEE",
        "lightgray-4": "#E0E0E0",
        "lightgray-5": "#BDBDBD",

        "darkgray-1": "#9E9E9E",
        "darkgray-2": "#757575",
        "darkgray-3": "#616161",
        "darkgray-4": "#424242",
        "darkgray-5": "#212121",
      },

      backgroundImage: {
        desktop: "url('/assets/images/Background/Desktop.png')",
        mobile: "url('/assets/images/Background/Mobile.png')",
      },

      spacing: {
        5: "1.25rem", // Adds 5 to the spacing scale (equivalent to 20px)
      },

      fontFamily: {
        bowlb: ["Bowlby One SC", "sans-serif"],
      },

      dropShadow: {
        normal: " 0px 8px 24px rgba(33, 158, 188, 0.24)",
      },

      rotate: {
        "y-180": "rotateY(180deg)",
      },

      borderRadius: {
        "32lg": "32px",
      },

      transformStyle: {
        "preserve-3d": "preserve-3d",
      },

      transitionDuration: {
        800: "800ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // Custom plugin for transform-style
    function ({ addUtilities }) {
      const newUtilities = {
        ".transform-style-preserve": {
          "transform-style": "preserve-3d",
        },
        ".transform-style-flat": {
          "transform-style": "flat",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
