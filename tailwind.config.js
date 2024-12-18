/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // fontFamily:"Inter,-apple-system,Helvetica,Arial,sans-serif"
      },
      fontFamily:"Inter,-apple-system,Helvetica,Arial,sans-serif",
    },
  },
  plugins: [],
};
