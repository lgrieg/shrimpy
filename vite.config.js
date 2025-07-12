// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // указываем папку с index.html
  base: '/shrimpy/',
  build: {
    outDir: '../docs', // куда собрать
    emptyOutDir: true,
  }
});
