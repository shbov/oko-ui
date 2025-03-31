import { createFileRoute } from '@tanstack/react-router';

import { WithAuth } from '~/packages/middlewares/WithAuth';

export const Route = createFileRoute('/resources/$resourceId/events/')({
    ...WithAuth({
        component: RouteComponent,
    }),
    loader: () => {
        return {
            crumb: 'События',
        };
    },
});

function RouteComponent() {
    return <div>Hello here!</div>;
}
