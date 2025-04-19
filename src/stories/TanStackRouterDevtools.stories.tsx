import { Suspense } from 'react';

import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';

import { TanStackRouterDevtools } from '../components/TanStackRouterDevtools';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Development/TanStackRouterDevtools',
    component: TanStackRouterDevtools,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            const rootRoute = createRootRoute({
                component: () => (
                    <div style={{ padding: '20px' }}>
                        <h3>TanStack Router Devtools</h3>
                        <p>This is a demo page for the router devtools.</p>
                        <Suspense fallback={<div>Loading devtools...</div>}>
                            <Story />
                        </Suspense>
                    </div>
                ),
            });

            const indexRoute = createRoute({
                getParentRoute: () => rootRoute,
                path: '*',
                component: () => <div>Demo Route</div>,
            });

            const routeTree = rootRoute.addChildren([indexRoute]);
            const router = createRouter({ routeTree });

            return <RouterProvider router={router} />;
        },
    ],
} satisfies Meta<typeof TanStackRouterDevtools>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
