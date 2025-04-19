import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { WithLang } from './decorators/withLang';
import { withStrictMode } from './decorators/withStrictMode';
import { WithTheme } from './decorators/withTheme';
// @ts-expect-error it's ok
import '../src/styles/index.scss';

import type { Preview } from '@storybook/react';

const preview: Preview = {
    decorators: [WithLang, WithTheme, withStrictMode],
    parameters: {
        jsx: { showFunctions: true },
        viewport: {
            viewports: MINIMAL_VIEWPORTS,
        },
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    { value: 'light', right: '☼', title: 'Light' },
                    { value: 'dark', right: '☾', title: 'Dark' },
                    {
                        value: 'light-hc',
                        right: '☼',
                        title: 'Light (high contrast)',
                    },
                    {
                        value: 'dark-hc',
                        right: '☾',
                        title: 'Dark (high contrast)',
                    },
                ],
                dynamicTitle: true,
            },
        },
        lang: {
            defaultValue: 'ru',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    {
                        value: 'ru',
                        right: '🇷🇺',
                        title: 'Ru',
                    },
                ],
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
