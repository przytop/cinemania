import { defineConfig } from 'vite';
import { sync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
        },
        plugins: [commonjs()],
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ['axios', 'lodash.throttle', 'izitoast', 'modal-video'],
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
