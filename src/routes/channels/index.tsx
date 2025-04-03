import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/')(
    WithAuth({
        component: RouteComponent,
    }),
);

function RouteComponent() {
    const router = useRouter();

    return (
        <Page
            title="Каналы оповещения"
            primaryActions={[
                {
                    label: 'Создать канал',
                    onClick: () => {
                        void router.navigate({
                            to: '/channels/create',
                        });
                    },
                },
            ]}
        >
            <div>Скоро...</div>
        </Page>
    );
}
