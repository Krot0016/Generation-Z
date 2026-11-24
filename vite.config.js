import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — относительные пути к ассетам.
// Благодаря этому сайт работает в ЛЮБОМ репозитории GitHub Pages
// (https://user.github.io/любое-имя/), имя репозитория менять не нужно.
export default defineConfig({
  base: './',
  plugins: [react()],
});
