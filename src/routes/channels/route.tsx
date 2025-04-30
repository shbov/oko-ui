import { createFileRoute } from '@tanstack/react-router';

import { t } from '~/services/i18n';

export const Route = createFileRoute('/channels')({
    loader: () => {
        return {
            crumb: t('crumb.channels'),
        };
    },
});
