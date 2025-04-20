import { settings } from '@gravity-ui/date-utils';
import { configure } from '@gravity-ui/uikit';

import { defaultLocale } from '~/services/i18n';

configure({
    lang: defaultLocale,
});

void settings.loadLocale(defaultLocale).then(() => {
    settings.setLocale(defaultLocale);
});
