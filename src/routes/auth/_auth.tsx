import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { zod } from '~/services/zod';

export const Route = createFileRoute('/auth/_auth')({
    validateSearch: zod.object({
        redirect: zod.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.status === 'AUTHENTICATED') {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({
                to: search.redirect || '/',
            });
        }
    },
    component: AuthLayout,
});

function AuthLayout() {
    return <Outlet />;
}
