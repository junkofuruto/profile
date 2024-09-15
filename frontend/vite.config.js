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
                key: fs.readFileSync(path.resolve(__dirname, 'certs', 'key.pem')),
                cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'cert.pem')),
            },
            hmr: {
                overlay: false
            }
        },
        assetsInclude: ['**/*.glb', '**/*.gltf']
    };
})
