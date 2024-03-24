/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        nord0: "#2e3440",
        nord1: "#3b4252",
        nord2: "#434c5e",
        nord3: "#4c566a",
        nord4: "#d8dee9",
        nord5: "#e5e9f0",
        nord6: "#eceff4",
        nord7: "#8fbcbb",
        nord8: "#88c0d0",
        nord9: "#81a1c1",
        nord10: "#5e81ac",
        nord11: "#bf616a",
        nord12: "#d08770",
        nord13: "#ebcb8b",
        nord14: "#a3be8c",
        nord15: "#b48ead",
        primary: "#8fbcbb",
        secondary: "#2e3440",
        info: "#5e81ac",
        success: "#a3be8c",
        warning: "#D08770",
        danger: "#bf616a",
      },
      fontFamily: {
        Millenia: ["Millenia", "serif"],
        BebasNeue: ["Bebas Neue", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
