import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/create')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'Создание канала оповещения',
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page title="Создание канала оповещения">
            <div>Скоро...</div>
        </Page>
    );
}
