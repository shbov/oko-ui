import { Pencil, TrashBin } from '@gravity-ui/icons';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/channels/$channelId/')(
    WithAuth({
        component: RouteComponent,
    }),
);

function RouteComponent() {
    const router = useRouter();
    const { channelId } = Route.useParams();

    return (
        <Page
            title="Канал оповещения"
            primaryActions={[
                {
                    label: 'Редактировать канал',
                    icon: Pencil,
                    onClick: () => {
                        void router.navigate({
                            to: '/channels/$channelId/edit',
                            params: {
                                channelId,
                            },
                        });
                    },
                },
            ]}
            secondaryActions={[
                {
                    label: 'Удалить',
                    icon: TrashBin,
                    theme: 'danger',
                    onClick: () => {},
                },
            ]}
        >
            <div>Скоро...</div>
        </Page>
    );
}
