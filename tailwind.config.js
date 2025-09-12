/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ab66",
        secondary: "#1a365d",
        biru: "#2E5090",
        biruMuda: "#00c3fe",
        toskaMuda: "#4ADE80",
        accent: "#f59e0b",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-custom": "radial-gradient(circle,rgba(0, 195, 254, 1) 0%, rgba(0, 171, 102, 1) 61%)",
      },
      fontSize: {
        xxs: [
          "0.625rem",
          {
            lineHeight: "0.875rem",
          },
        ],
      },
    },
  },
};
