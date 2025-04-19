import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';

import { AppLayout } from '../components/AppLayout';
import { PageActionsProvider } from '../components/AppLayout/PageActionsContext';

import type { Meta, StoryObj } from '@storybook/react';
import type { RouteComponent } from '@tanstack/react-router';

const meta = {
    title: 'Layout/AppLayout',
    component: AppLayout,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const HomeContent: RouteComponent = () => (
    <div style={{ padding: '20px' }}>
        <h1>Home Page</h1>
        <p>This is the home page content.</p>
    </div>
);

const AboutContent: RouteComponent = () => (
    <div style={{ padding: '20px' }}>
        <h1>About Page</h1>
        <p>This is the about page content.</p>
    </div>
);

const DashboardContent: RouteComponent = () => (
    <div style={{ padding: '20px' }}>
        <h1>Dashboard</h1>
        <p>This is the dashboard content with some sample data.</p>
        <div style={{ marginTop: '20px' }}>
            <h2>Recent Activity</h2>
            <ul>
                <li>User logged in</li>
                <li>Document updated</li>
                <li>Task completed</li>
            </ul>
        </div>
    </div>
);

// Create router for the story
const createAppRouter = (component: RouteComponent) => {
    const rootRoute = createRootRoute({
        component: AppLayout,
    });

    const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '*',
        component,
    });

    const routeTree = rootRoute.addChildren([indexRoute]);
    return createRouter({ routeTree });
};

export const Default: Story = {
    args: {},
    decorators: [
        () => (
            <PageActionsProvider>
                <RouterProvider router={createAppRouter(HomeContent)} />
            </PageActionsProvider>
        ),
    ],
};

export const WithAboutPage: Story = {
    args: {},
    decorators: [
        () => (
            <PageActionsProvider>
                <RouterProvider router={createAppRouter(AboutContent)} />
            </PageActionsProvider>
        ),
    ],
};

export const WithDashboard: Story = {
    args: {},
    decorators: [
        () => (
            <PageActionsProvider>
                <RouterProvider router={createAppRouter(DashboardContent)} />
            </PageActionsProvider>
        ),
    ],
};
