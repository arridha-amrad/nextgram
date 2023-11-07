const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (!opacityValue) {
      return `rgba(${variableName})`;
    }
    return `rgba(${variableName}, ${opacityValue})`;
  };
};

// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Grandstander"],
    },
    extend: {
      fill: {
        skin: {
          base: "var(--color-fill)",
        },
      },
      textColor: {
        skin: {
          base: "var(--color-fill)",
          accent: withOpacity("var(--text-secondary)"),
        },
      },
      borderColor: {
        skin: {
          base: "var(--color-border)",
        },
      },
      stroke: {
        skin: {
          base: "var(--color-border)",
        },
      },
      animation: {
        fade: "fade 1s ease-in",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#0095F6",
              100: "#CBF6FE",
              200: "#98E8FE",
              300: "#64D2FC",
              400: "#3EBAF9",
              500: "#0095F6",
              600: "#0073D3",
              700: "#0056B1",
              800: "#003D8E",
              900: "#002B76",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#0095F6",
              100: "#CBF6FE",
              200: "#98E8FE",
              300: "#64D2FC",
              400: "#3EBAF9",
              500: "#0095F6",
              600: "#0073D3",
              700: "#0056B1",
              800: "#003D8E",
              900: "#002B76",
            },
          },
        },
      },
      layout: {
        borderWidth: {
          large: "3px",
          medium: "2px",
          small: "1px",
        },
      },
    }),
  ],
};

export default config;
