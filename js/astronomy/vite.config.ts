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
        entry: resolve(__dirname, 'src/astronomy.ts'),
        fileName: 'astronomy',
        name: 'astronomy',
      },
      rollupOptions: {
        external: ['ephemerides', '@tsastro/tsofa', ...builtinModules],
      },
    },
    test: {
      globals: true,
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
