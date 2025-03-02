import * as path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [TanStackRouterVite(), viteReact()],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
            },
        },
        define: {
            OKO: JSON.stringify({
                title: 'Oko UI',
                version: process.env.npm_package_version,
                endpoints: {
                    userService: env.VITE_USER_SERVICE_URL || '',
                },
            }),
        },
    };
});
