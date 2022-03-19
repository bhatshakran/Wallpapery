module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "back-color": "#F5F5F5",
        "card-color": "#F7E2E2",
        "text-primary": "#05595B",
        "text-sec": "#062C30",
      },
    },
  },
  plugins: [],
};
