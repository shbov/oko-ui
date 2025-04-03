import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
    '/resources/$resourceId/snapshots/$snapshotId',
)({
    loader: ({ params }) => {
        return {
            crumb: params.snapshotId,
        };
    },
});
