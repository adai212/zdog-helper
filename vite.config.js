import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.js'),
      name: 'zdogHelper',
      fileName: 'zdog-helper',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled into library.
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps.
        globals: { vue: 'Vue' },
        entryFileNames: 'zdog-helper.[format].js',
        chunkFileNames: '[name].js'
      }
    }
  }
})
