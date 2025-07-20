/**
 * @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}"
];
export const theme = {
  extend: {
    colors: {
      sahayak: {
        light: '#FFFBDE',
        blue1: '#91C8E4',
        blue2: '#749BC2',
        blue3: '#4682A9',
      },
    },
  },
};
export const plugins = []; 