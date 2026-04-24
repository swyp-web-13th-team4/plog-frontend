import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

const isStorybook = process.env.STORYBOOK === 'true';

const externals = new Set([
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@base-ui/react',
  '@plog/utils',
  'class-variance-authority',
  'tailwindcss',
  'use-sync-external-store',
]);

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
    !isStorybook &&
      dts({
        include: ['src'],
        rollupTypes: true,
        tsconfigPath: './tsconfig.app.json',
      }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rolldownOptions: {
      external: (id) => {
        if (externals.has(id)) return true;
        for (const ext of externals) {
          if (id.startsWith(`${ext}/`)) return true;
        }
        return false;
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
