import { createFileRoute } from '@tanstack/react-router';

import { t } from '~/services/i18n';

export const Route = createFileRoute('/resources/$resourceId/events')({
    loader: () => {
        return {
            crumb: t('resources.events.title'),
        };
    },
});
