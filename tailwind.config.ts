import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgcool: '#232323',
        hem: '#ffffff',
        mem: '#383838',
        surfaces: '#333333',
      },
    },
  },
  plugins: [],
};
export default config;
