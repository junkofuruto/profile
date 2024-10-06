import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(() => {
    return {
        plugins: [solid()],
        server:
        {
            host: "0.0.0.0",
            port: "8080",
            hmr: {
                overlay: false
            }
        },
        assetsInclude: ['**/*.glb', '**/*.gltf']
    };
})
