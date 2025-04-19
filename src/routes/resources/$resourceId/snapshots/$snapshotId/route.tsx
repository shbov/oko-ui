import { createFileRoute } from '@tanstack/react-router';

import { getSnapshotId } from '../-utils';

export const Route = createFileRoute(
    '/resources/$resourceId/snapshots/$snapshotId',
)({
    loader: ({ params }) => {
        return {
            crumb: getSnapshotId({
                resourceId: params.resourceId,
                snapshotId: params.snapshotId,
            }),
        };
    },
});
