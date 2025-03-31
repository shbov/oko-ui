import { settings } from '@gravity-ui/date-utils';
import { configure } from '@gravity-ui/uikit';

configure({
    lang: 'ru',
});

void settings.loadLocale('ru').then(() => {
    settings.setLocale('ru');
});
