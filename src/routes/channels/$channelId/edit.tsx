import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/$channelId/edit')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: `Редактирование канала`,
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Редактирование канала">
            <div>Скоро...</div>
        </Page>
    );
}
