/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans files in app directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans files in app directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components
    "./src/styles/**/*.css", // Scans global CSS files in styles directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
