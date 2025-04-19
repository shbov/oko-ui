import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';

import { UILink } from '../components/UILink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Navigation/UILink',
    component: UILink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            const rootRoute = createRootRoute({
                component: () => <Story />,
            });

            const indexRoute = createRoute({
                getParentRoute: () => rootRoute,
                path: '*',
                component: () => <Story />,
            });

            const routeTree = rootRoute.addChildren([indexRoute]);
            const router = createRouter({ routeTree });

            return <RouterProvider router={router} />;
        },
    ],
} satisfies Meta<typeof UILink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        to: '/',
        children: 'Home',
    },
};

export const WithCustomStyle: Story = {
    args: {
        to: '/about',
        children: 'About Us',
        style: { color: 'blue', fontWeight: 'bold' },
    },
};

export const ExternalLink: Story = {
    args: {
        to: 'https://example.com',
        children: 'External Link',
        target: '_blank',
        rel: 'noopener noreferrer',
    },
};
