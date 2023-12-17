const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        root_beer: "#2b1009",
        pastel_brown: "#7d6d60",
        very_pale_orange: "#ffd8c1",
        seashell: "#fff6ef",
        linen: "#f9ede5",
        platinum: "#eae5e3",
        brandeis_blue: "#0e76fd",
      },
      keyframes: {
        opacity: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeUp: {
          "0%": {
            transform: "translateY(80px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        opacity: "opacity 0.1s",
        "fade-up": "fadeUp 0.2s",
      },
    },
  },
};
export default config;
