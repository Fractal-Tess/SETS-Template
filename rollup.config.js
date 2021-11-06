import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/svelte/svelte.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'fpm',
    file: './public/build/bundle.js'
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        scss: true,
        sourceMap: !production,
        typescript: {
          // Use specific tsconfig for svelte compilation
          tsconfigFile: './tsconfig.svelte.json'
        }
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      }
    }),
    // Extract css
    css({
      output: 'bundle.css',
      mangle: !production,
      compress: !production
    }),

    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    commonjs(),
    typescript({
      tsconfig: './tsconfig.svelte.json',
      sourceMap: !production,
      inlineSources: !production
    }),

    production &&
      terser({
        compress: true,
        mangle: true
      })
  ],
  watch: {
    clearScreen: false
  }
};
