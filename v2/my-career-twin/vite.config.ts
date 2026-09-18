import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function spaMultiPathPlugin(): Plugin {
    return {
        name: 'spa-multi-path',
        closeBundle() {
            const distDir = path.resolve(import.meta.dirname, 'dist');
            const indexPath = path.join(distDir, 'index.html');
            if (fs.existsSync(indexPath)) {
                const indexHtml = fs.readFileSync(indexPath, 'utf-8');

                const deDir = path.join(distDir, 'de');
                const frDir = path.join(distDir, 'fr');
                const enDir = path.join(distDir, 'en');

                fs.mkdirSync(deDir, { recursive: true });
                fs.mkdirSync(frDir, { recursive: true });
                fs.mkdirSync(enDir, { recursive: true });

                fs.writeFileSync(path.join(deDir, 'index.html'), indexHtml);
                fs.writeFileSync(path.join(frDir, 'index.html'), indexHtml);
                fs.writeFileSync(path.join(enDir, 'index.html'), indexHtml);
                fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);
            }
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), spaMultiPathPlugin()],
    server: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.2:3000',
                changeOrigin: true,
            },
        },
    },
});
