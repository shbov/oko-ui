import { createFileRoute } from '@tanstack/react-router';

import { EMPTY_DASH } from '~/constants/common';
import { api } from '~/services/api';

export const Route = createFileRoute('/resources/$resourceId')({
    loader: async ({ params }) => {
        const { resourceId } = params;
        const resource = await api.resource.get({ id: resourceId });

        return {
            crumb: resource.resource.name ?? EMPTY_DASH,
        };
    },
});
