import * as React from 'react';

import { getThemeType } from '@gravity-ui/uikit';
import { type API, addons, types, useGlobals } from '@storybook/manager-api';

import { themes } from '../theme';

import type { RealTheme } from '@gravity-ui/uikit';

const ADDON_ID = 'yc-theme-addon';
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
        api.setOptions({ theme: themes[getThemeType(theme as RealTheme)] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);
    return null;
}
