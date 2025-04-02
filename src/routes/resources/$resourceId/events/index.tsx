import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/resources/$resourceId/events/')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'События ресурса',
            };
        },
    }),
);

function RouteComponent() {
    return <Page title="События ресурса">Скоро...</Page>;
}
