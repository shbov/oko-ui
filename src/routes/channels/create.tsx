import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/create')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'Создание канала',
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Создание канала">
            <div>Скоро...</div>
        </Page>
    );
}
