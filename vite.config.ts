// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';

const generateContentRoutes = (pathPrefix: string, contentDir: string) => {
  return {
    contentDir,
    transform: (file: PrerenderContentFile) => {
      if (file.attributes['draft']) {
        return false;
      }

      const slug = file.attributes['slug'] || file.name;
      return `/${pathPrefix}/${slug}`;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => [
          '/',
          '/home',
          '/about',
          '/contact',
          '/portfolio',
          '/blog',
          generateContentRoutes('portfolio', 'src/content/projects'),
          generateContentRoutes('blog', 'src/content/blog'),
        ],
        sitemap: {
          host: 'https://arminbusatlic.com/',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
