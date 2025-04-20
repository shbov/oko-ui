// eslint-disable-next-line no-restricted-imports
import { init, t } from 'i18next';

import { ru } from '~/translation/ru';

export const defaultLocale = 'ru';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init({
    lng: defaultLocale,
    resources: {
        ru: {
            translation: ru,
        },
    },
});

export { t };
