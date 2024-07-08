import sharedConfig from '@swifty/tailwind-config';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
};

export default config;
