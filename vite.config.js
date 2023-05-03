import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
   base: '/DBTL-List-Reveal/',
   plugins: [react()],
      test: {
         globals: true,
         environment: 'jsdom',
         setupFiles: './__tests__/setup.js',
         css: true,
         coverage: {
            reporter: ['text', 'json', 'html'],
         },
      },
});
