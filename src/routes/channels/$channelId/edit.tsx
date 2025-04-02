import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/$channelId/edit')(
    WithAuth({
        component: RouteComponent,
        loader: ({ params }) => {
            return {
                crumb: `Редактирование канала оповещения ${params.channelId}`,
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Редактирование канала оповещения">
            <div>Скоро...</div>
        </Page>
    );
}
