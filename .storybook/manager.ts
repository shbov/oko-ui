import { addons } from '@storybook/manager-api';

import { themes } from './theme';

addons.setConfig({
    theme: themes.dark,
    sidebar: {
        showRoots: true,
    },
    docs: {
        theme: themes.dark,
    },
});
