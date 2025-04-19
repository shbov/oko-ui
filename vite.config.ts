import * as path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import type { Plugin } from 'vite';

// https://vite.dev/config/
export default defineConfig(() => {
    const routerPlugin = TanStackRouterVite() as Plugin;

    return {
        plugins: [routerPlugin, viteReact()],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
            },
        },
        build: {
            chunkSizeWarningLimit: 1000, // Increase the warning limit to 1000kb
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Core framework and routing
                        vendor: [
                            'react',
                            'react-dom',
                            '@tanstack/react-router',
                            '@tanstack/react-query',
                            '@tanstack/react-query-devtools',
                            '@tanstack/react-form',
                            '@tanstack/zod-form-adapter',
                        ],
                        // UI components and styling
                        ui: [
                            '@gravity-ui/uikit',
                            '@gravity-ui/components',
                            '@gravity-ui/icons',
                            '@gravity-ui/navigation',
                            '@gravity-ui/date-components',
                            '@gravity-ui/date-utils',
                            '@gravity-ui/illustrations',
                            '@bem-react/classname',
                            'bem-cn-lite',
                        ],
                        // Data handling and utilities
                        utils: [
                            'lodash',
                            'zod',
                            'ky',
                            '@gravity-ui/data-source',
                        ],
                        // Image and visualization
                        media: [
                            '@bmunozg/react-image-area',
                            'react-diff-viewer',
                            'react-syntax-highlighter',
                        ],
                    },
                },
            },
        },
        define: {
            OKO: JSON.stringify({
                title: 'Oko UI',
                version: process.env.npm_package_version,
            }),
        },
        server: {
            proxy: {
                '/api': {
                    target: 'https://oko.shbov.ru/api',
                    changeOrigin: true,
                    secure: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});
