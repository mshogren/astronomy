/// <reference types="vitest" />
import { builtinModules } from 'module';
import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/ephemerides.ts'),
        fileName: 'ephemerides',
        name: 'ephemerides',
      },
      rollupOptions: {
        external: ['@xmldom/xmldom', ...builtinModules],
      },
    },
    test: {
      browser: {
        provider: 'webdriverio',
        name: 'chrome',
        headless: true,
      },
      globals: true,
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
    },
    plugins: [
      mode !== 'test' &&
        checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
        }),
      dts({ rollupTypes: true }),
    ],
  } as UserConfig;
});
