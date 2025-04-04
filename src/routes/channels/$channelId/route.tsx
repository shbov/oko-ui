import { createFileRoute } from '@tanstack/react-router';

import { api } from '~/services/api';

export const Route = createFileRoute('/channels/$channelId')({
    loader: async ({ params }) => {
        const { channel } = await api.notification.getChannel({
            id: params.channelId,
        });

        return {
            crumb: channel.name,
            channel,
        };
    },
});
