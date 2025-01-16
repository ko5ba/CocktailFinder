/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    // добавляем наши кастомные классы
    extend: {
      colors: {
        accent: "#FF0F82",
        background: "#141414",
        text: "#FFFFFF",
        textMuted: "#D3D3D3",
      },
    },
  },
  plugins: [
    // добавляем глобальные стили
    function ({ addBase, theme }) {
      addBase({
        "*": {
          boxSizing: "border-box",
        },
        "html, body": {
          margin: 0,
          padding: 0,
          fontSize: "1rem",
          lineHeight: 1.4,
          fontFamily: theme("fontFamily.sans"),
          color: theme("colors.text"),
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      });
    },
  ],
};
