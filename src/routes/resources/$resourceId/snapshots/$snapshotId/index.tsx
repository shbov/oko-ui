import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute(
    '/resources/$resourceId/snapshots/$snapshotId/',
)(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'Снапшот ресурса',
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Снапшот ресурса">
            <div>Скоро...</div>
        </Page>
    );
}
