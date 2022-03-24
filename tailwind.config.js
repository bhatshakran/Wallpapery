module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        amazingslab: "Amazing-slab",
        vistol: "Vistol-sans",
      },
      colors: {
        "background-color": "#edede8",
        "text-primary": "#405b53",
        "text-sec": "#575757",
        "card-red": "#d52c40",
      },
    },
  },
  plugins: [],
};
