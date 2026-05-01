tailwind.config = {
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
        portal: {
          brand: "#F05A22",       // Vibrant orange for light mode
          brandlight: "#FFFFFF",  // White for dark mode hover states on orange background
          gray: "#F3F4F6",        // Light mode bg
          dark: "#7C2400",        // Fallback for dark mode bg
          carddark: "rgba(0, 0, 0, 0.35)",    // Translucent black for dark mode cards
          border: "#E5E7EB",      // Light mode borders
          borderdark: "rgba(255, 255, 255, 0.15)" // Translucent white for dark mode borders
        },
      },
    },
  },
};