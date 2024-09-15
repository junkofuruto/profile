import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import fs from 'fs';
import path from 'path';

export default defineConfig(() => {
    return {
        plugins: [solid()],
        server:
        {
            host: "0.0.0.0",
            port: "443",
            https: {
                key: fs.readFileSync("/etc/constructmg/key.pem"),
                cert: fs.readFileSync("/etc/constructmg/cert.pem"),
            },
            hmr: {
                overlay: false
            }
        },
        assetsInclude: ['**/*.glb', '**/*.gltf']
    };
})
