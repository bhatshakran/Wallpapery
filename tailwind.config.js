module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "back-color": "#062C30",
        "card-color": "#05595B",
        "text-primary": "#F7E2E2",
        "text-sec": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
