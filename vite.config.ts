import * as path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite(), viteReact()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use '@gravity-ui/uikit/styles/fonts';
                    @use '@gravity-ui/uikit/styles/styles';
                `,
            },
        },
    },
});
