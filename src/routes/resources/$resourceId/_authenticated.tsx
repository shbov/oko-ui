import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$resourceId/_authenticated')({
    beforeLoad: async ({ context, location }) => {
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
    component: AuthenticatedLayout,
    staticData: {
        crumb: '',
    },
});

function AuthenticatedLayout() {
    return <Outlet />;
}
