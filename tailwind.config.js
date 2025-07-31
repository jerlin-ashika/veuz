/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#E6FF00",
        liteGreen: "#24fd55",
        greenWithOp: " #F0FFF0",
        green: "#258B39",
        cus_gray: "#FAFAFA",
        cus_text_gray: "#D4D4D4",
      },
      backgroundImage: {
        "purple-gradient": "linear-gradient(90deg, #5B2A7C 0%, #431B5A 100%)",
        "orange-gradient": "linear-gradient(90deg, #CD670A 0%, #CA3722 100%)",
        "green-dark-gradient":
          "linear-gradient(90deg, #173903 0%, #081D01 100%)",
        "red-gradient": "linear-gradient(90deg, #B5040A 0%, #631308 100%)",
        "green-light-gradient":
          "linear-gradient(90deg, #53BE2C 0%, #27870C 100%)",
        "blue-gradient": "linear-gradient(90deg, #004D98 0%, #01277C 100%)",
        "ribbon-gradient":
          "linear-gradient(183.24deg, #16F25C 5.66%, #04270F 75.06%)",
        "footer-gradient": " linear-gradient(90deg, #299D3F 0%, #123F22 100%)",
        "border-gradient":
          " linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.0184) 100%)",
        "button-gradient": " linear-gradient(90deg, #AB0202 0%, #240102 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
