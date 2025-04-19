import { ThemeProvider } from '@gravity-ui/uikit';

import type { Decorator } from '@storybook/react';

export const WithTheme: Decorator = (Story, context) => {
    return (
        <ThemeProvider
            theme={context.globals.theme}
            direction={context.globals.direction}
        >
            <Story {...context} />
        </ThemeProvider>
    );
};
