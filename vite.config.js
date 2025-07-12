import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: './firebase.js', dest: '.' },
        { src: './exceljs.min.js', dest: '.' }
      ]
    })
  ]
})
