import * as React from 'react';

import { settings } from '@gravity-ui/date-utils';
import { configure } from '@gravity-ui/uikit';

import type { Decorator } from '@storybook/react';

export const withLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;
    configure({ lang });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        void (async () => {
            await settings.loadLocale(lang as string);
            settings.setLocale(lang as string);
        })();
    }, [lang]);

    return <Story key={lang} {...context} />;
};
