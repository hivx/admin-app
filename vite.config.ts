/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="vitest" />
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import eslint from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(timezone);

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  env.NODE_ENV = mode;

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      ['process.env.' + key]: `"${val}"`,
    };
  }, {});

  const isDev = mode === 'development';
  const basePath = process.env.PUBLIC_URL || '/';

  // get version number and build time
  const version = await import('./src/version.js');
  dayjs.extend(timezone);
  const buildDate = dayjs().tz('Asia/Bangkok');
  const releaseDate = buildDate.format('DD/MM/YYYY hh:mm:ss'); // dd/mm/yyyy

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      isDev && eslint({ include: ['**/*.ts', '**/*.tsx'], failOnError: false }),
      splitVendorChunkPlugin(),
      createHtmlPlugin({
        // inject version.js into html
        inject: {
          tags: [
            {
              injectTo: 'head-prepend',
              tag: 'meta',
              attrs: {
                name: 'version',
                content: version.default,
              },
            },
            {
              injectTo: 'head-prepend',
              tag: 'meta',
              attrs: {
                name: 'release-date',
                content: releaseDate,
              },
            },
          ],
        },
      }),
    ],
    base: basePath,
    build: {
      outDir: './build',
      emptyOutDir: true,
      rollupOptions: {
        plugins: [
          inject({
            process: 'process',
          }) as Plugin,
        ],
      },
    },
    optimizeDeps: {
      entries: ['msw'],
    },
    server: {
      port: 3331,
      open: false,
      strictPort: true,
      host: true,
    },
    define: envWithProcessPrefix,
    test: {
      globals: true,
      environment: 'jsdom',
      reporters: ['default', 'junit'],
      outputFile: './.test/result.xml',
    },
  };
});
