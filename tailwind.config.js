module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        soft: {
          canvas: "#1a1a1a",
          deep: "#141414",
        },
        portal: {
          blue: "#005A9E",
          lightblue: "#60A5FA",
          gray: "#F3F4F6",
          dark: "#111827",
          carddark: "#1F2937",
          border: "#E5E7EB",
          borderdark: "#374151",
        },
      },
    },
  },
};
