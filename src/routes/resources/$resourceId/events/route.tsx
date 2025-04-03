import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$resourceId/events')({
    loader: () => {
        return {
            crumb: 'События',
        };
    },
});
