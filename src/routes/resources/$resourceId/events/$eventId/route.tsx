import { createFileRoute } from '@tanstack/react-router';

import { EMPTY_DASH } from '~/constants/common';
import { api } from '~/services/api';

export const Route = createFileRoute('/resources/$resourceId/events/$eventId')({
    loader: async ({ params }) => {
        const { eventId } = params;
        const event = await api.event.getEvent({ id: eventId });

        return {
            crumb: event.event.name ?? EMPTY_DASH,
        };
    },
});
