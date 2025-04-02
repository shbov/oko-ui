import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/resources/$resourceId/snapshots/')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'Снимки ресурса',
            };
        },
    }),
);

function RouteComponent() {
    return <Page title="Snapshots">Скоро...</Page>;
}
