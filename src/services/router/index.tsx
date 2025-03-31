import { createRouter } from '@tanstack/react-router';

import { ErrorContainer } from '~/components/ErrorContainer';
import type { AuthData } from '~/hooks/useAuth/types';
import { routeTree } from '~/routeTree.gen';
import { dataManager } from '~/services/data-source';

import type { RouterContext } from './types';

const context: RouterContext = {
    auth: null as unknown as AuthData,
    dataManager,
};

export const router = createRouter({
    routeTree,
    context,
    defaultErrorComponent: ({ error }) => (
        <ErrorContainer title={error.name} description={error.message} />
    ),
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
