import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/')(
    WithAuth({
        component: RouteComponent,
        loader: () => {
            return {
                crumb: 'Каналы оповещения',
            };
        },
    }),
);

function RouteComponent() {
    return (
        <Page
            title="Каналы оповещения"
            primaryActions={[
                {
                    label: 'Создать канал',
                    onClick: () => {},
                },
            ]}
        >
            <div>Скоро...</div>
        </Page>
    );
}
