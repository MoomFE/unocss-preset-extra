/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, mode === 'test-build' ? './dist' : './src'),
        '@@': __dirname,
      },
    },
    test: {

    },
  };
});
