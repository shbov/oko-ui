import { redirect } from '@tanstack/react-router';

import type { RouterContext } from '~/services/router/types';

import type { ParsedLocation, RouteComponent } from '@tanstack/react-router';

export const WithAuth = ({
    component,
}: {
    component: RouteComponent | undefined;
}) => {
    return {
        beforeLoad: async ({
            context,
            location,
        }: {
            context: RouterContext;
            location: ParsedLocation;
        }) => {
            let shouldRedirect = false;
            if (context.auth.status === 'PENDING') {
                try {
                    await context.auth.ensureData();
                } catch (_) {
                    shouldRedirect = true;
                }
            }

            if (context.auth.status === 'UNAUTHENTICATED') {
                shouldRedirect = true;
            }

            if (shouldRedirect) {
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw redirect({
                    to: '/auth/login',
                    search: {
                        redirect: location.href,
                    },
                });
            }
        },
        component,
    };
};
