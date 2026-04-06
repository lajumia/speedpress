import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Tailwind v4 plugin
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // add Tailwind v4 plugin here
  ],
  build: {
    outDir: path.resolve(__dirname, './build'), // output relative to plugin
    emptyOutDir: true,
    manifest: true, // required to enqueue hashed files in WP
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'),
    },
  },
});