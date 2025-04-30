// eslint-disable-next-line no-restricted-imports
import { init, t } from 'i18next';

import { en } from '~/translation/en';
import { ru } from '~/translation/ru';

export const defaultLocale = 'ru';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init({
    lng: defaultLocale,
    resources: {
        en: {
            translation: en,
        },
        ru: {
            translation: ru,
        },
    },
    fallbackLng: defaultLocale,
});

export { t };
