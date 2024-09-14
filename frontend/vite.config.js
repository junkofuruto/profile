import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import fs from 'fs';
import path from 'path';

export default defineConfig(() => {
    const args = process.argv.slice(2);
    const overlay = args.find(arg => arg.startsWith('--overlay=').split("=")[1]) === "true";

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
                overlay: overlay
            }
        },
        assetsInclude: ['**/*.glb', '**/*.gltf']
    };
})
