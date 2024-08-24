import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server:
  {
    host: "192.168.0.10",
    port: "30080"
  },
  assetsInclude: ['**/*.glb', '**/*.gltf']
})
