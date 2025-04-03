import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/channels/$channelId')({
    loader: ({ params }) => {
        return {
            crumb: params.channelId,
        };
    },
});
