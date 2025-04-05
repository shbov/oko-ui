import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';

import { withLang } from './decorators/withLang';
import { withStrictMode } from './decorators/withStrictMode';
import { withTheme } from './decorators/withTheme';
// @ts-expect-error it's ok
import '../src/styles/index.scss';

import type { Preview } from '@storybook/react';

const preview: Preview = {
    decorators: [withLang, withTheme, withStrictMode],
    parameters: {
        jsx: { showFunctions: true },
        viewport: {
            viewports: MINIMAL_VIEWPORTS,
        },
        options: {
            storySort: {
                order: ['Theme', 'Components', ['Basic']],
                method: 'alphabetical',
            },
        },
        docs: {
            theme: themes.dark,
        },
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            defaultValue: 'dark',
            toolbar: {
                icon: 'mirror',
                items: [
                    {
                        value: 'dark',
                        right: '☾',
                        title: 'Dark',
                    },
                ],
                dynamicTitle: true,
            },
        },
        lang: {
            name: 'Language',
            defaultValue: 'ru',
            toolbar: {
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
        direction: {
            defaultValue: 'ltr',
            toolbar: {
                title: 'Direction',
                icon: 'menu',
                items: [
                    {
                        value: 'ltr',
                        title: 'Left to Right',
                        icon: 'arrowrightalt',
                    },
                ],
                dynamicTitle: true,
            },
        },
        platform: {
            name: 'Platform',
            defaultValue: 'desktop',
            toolbar: {
                items: [
                    {
                        value: 'desktop',
                        title: 'Desktop',
                        icon: 'browser',
                    },
                ],
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
