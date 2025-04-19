import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@chromatic-com/storybook',
        {
            name: '@storybook/addon-essentials',
            options: { backgrounds: false },
        },
        '@storybook/experimental-addon-test',
        './theme-addons/register.tsx',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
export default config;
