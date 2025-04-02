import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/$channelId/')(
    WithAuth({
        component: RouteComponent,
        loader: ({ params }) => {
            return {
                crumb: params.channelId,
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Канал оповещения">
            <div>Скоро...</div>
        </Page>
    );
}
