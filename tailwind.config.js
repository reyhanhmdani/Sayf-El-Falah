/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
          extend: {
            colors: {
              primary: "#00ab66",
              secondary: "#1a365d",
              biru: "#0099FF",
              toskaMuda: "#4ADE80",
              accent: "#f59e0b",
            },
            fontFamily: {
              heading: ["Inter", "sans-serif"],
              body: ["Poppins", "sans-serif"],
            },
          },
        },
};
