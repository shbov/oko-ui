import { createRouter } from '@tanstack/react-router';

import { ErrorContainer } from '~/components/ErrorContainer';
import { routeTree } from '~/routeTree.gen';

export const router = createRouter({
    routeTree,
    defaultErrorComponent: ({ error }) => (
        <ErrorContainer title={error.name} description={error.message} />
    ),
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface StaticDataRouteOption {
        crumb: string;
    }
}
