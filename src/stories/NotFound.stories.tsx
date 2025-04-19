import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';

import { NotFound } from '../components/NotFound';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Pages/NotFound',
    component: NotFound,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create router for the story
const rootRoute = createRootRoute({
    component: NotFound,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFound,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

export const Default: Story = {
    args: {},
    decorators: [() => <RouterProvider router={router} />],
};
