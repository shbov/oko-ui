import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

function RouteComponent() {
    return (
        <Page title="Снапшот ресурса">
            <div>Скоро...</div>
        </Page>
    );
}

export const Route = createFileRoute(
    '/resources/$resourceId/snapshots/$snapshotId/',
)(
    WithAuth({
        component: RouteComponent,
    }),
);
