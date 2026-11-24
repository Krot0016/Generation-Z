import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Относительный base позволяет открывать сборку и с GitHub Pages
// (https://<user>.github.io/<repo>/), и с собственного домена
// без правки конфига под имя репозитория.
export default defineConfig({
  base: './',
  plugins: [react()],
});
