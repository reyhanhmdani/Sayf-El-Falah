/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
          extend: {
            colors: {
              primary: "#00ab66",
              secondary: "#1a365d",
              accent: "#f59e0b",
            },
            fontFamily: {
              heading: ["Playfair Display", "serif"],
              body: ["Poppins", "sans-serif"],
            },
          },
        },
};
