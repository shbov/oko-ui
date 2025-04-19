import * as React from 'react';

import { getThemeType } from '@gravity-ui/uikit';
import { addons, types, useGlobals } from '@storybook/manager-api';

import { themes } from '../theme';

import type { RealTheme } from '@gravity-ui/uikit';
import type { API } from '@storybook/manager-api';

const ADDON_ID = 'g-theme-addon';
const TOOL_ID = `${ADDON_ID}tool`;

addons.register(ADDON_ID, (api) => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme',
        render: () => {
            return <Tool api={api} />;
        },
    });
});

function Tool({ api }: { api: API }) {
    const [{ theme }] = useGlobals();
    React.useEffect(() => {
        const themeType = getThemeType(theme as RealTheme);
        api.setOptions({
            theme: themes[themeType],
            docs: {
                theme: themes[themeType],
            },
        });
    }, [theme, api]);
    return null;
}
