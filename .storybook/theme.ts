import { create } from '@storybook/theming';

export const CloudThemeLight = create({
    base: 'light',

    colorPrimary: '#027bf3',
    colorSecondary: 'rgba(2, 123, 243, 0.6)',

    // Typography
    fontBase: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    fontCode:
        '"SF Mono", "Menlo", "Monaco", "Consolas", "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "Courier", monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'black',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: '#027bf3',
    // barBg: '#027bf3',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandUrl: 'https://github.com/shbov/oko-ui',
    brandTitle: `<div style="font-size: 18px; color: #027bf3; font-weight: 600; margin-top: -6px; margin-bottom: 2px;">OKO UI</div>
                <div style="font-size: 14px;color: #7d7d7d;font-weight: 400;">Components</div>`,
});

export const CloudThemeDark = create({
    base: 'dark',

    colorPrimary: '#027bf3',
    colorSecondary: 'rgba(2, 123, 243, 0.6)',

    // Typography
    fontBase: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    fontCode:
        '"SF Mono", "Menlo", "Monaco", "Consolas", "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "Courier", monospace',

    // Text colors
    textColor: '#EEEEEE',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: '#EEEEEE',
    barSelectedColor: '#027bf3',
    barBg: '#222222',

    // Form colors
    inputBg: '#3B4048',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputTextColor: '#EEEEEE',
    inputBorderRadius: 4,

    // Documentation colors
    appBg: '#222222',
    appContentBg: '#222222',
    appBorderColor: 'rgba(255,255,255,0.1)',
    appBorderRadius: 4,

    brandUrl: 'https://github.com/shbov/oko-ui',
    brandTitle: `<div style="font-size: 18px; color: #027bf3; font-weight: 600; margin-top: -6px; margin-bottom: 2px;">OKO UI</div>
                <div style="font-size: 14px;color: #7d7d7d;font-weight: 400;">Components</div>`,
});

export const themes = {
    light: CloudThemeLight,
    dark: CloudThemeDark,
};
