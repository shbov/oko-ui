import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import viteReact from '@vitejs/plugin-react-swc';
import { defineWorkspace } from 'vitest/config';

const dirname =
    typeof __dirname !== 'undefined'
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
    {
        plugins: [viteReact()],
        test: {
            name: 'unit',
            globals: true,
            environment: 'jsdom',
            pool: 'vmThreads',
            setupFiles: ['./tests/setup.ts'],
            include: ['**/*.test.{ts,tsx}'],
        },
    },
    {
        extends: 'vite.config.ts',
        plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
            storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
            name: 'storybook',
            include: ['**/*.stories.{js,jsx,ts,tsx}'],
            browser: {
                enabled: true,
                headless: true,
                name: 'chromium',
                provider: 'playwright',
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
        },
    },
]);
