import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$resourceId/snapshots')({
    loader: () => {
        return {
            crumb: 'Снимки ресурса',
        };
    },
});
