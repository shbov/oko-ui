import { configure } from '@gravity-ui/uikit';

import type { Decorator } from '@storybook/react';

export const WithLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({ lang });

    return <Story key={lang} {...context} />;
};
