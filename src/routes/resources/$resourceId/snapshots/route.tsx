import { createFileRoute } from '@tanstack/react-router';

import { t } from '~/services/i18n';

export const Route = createFileRoute('/resources/$resourceId/snapshots')({
    loader: () => {
        return {
            crumb: t('crumb.snapshots'),
        };
    },
});
