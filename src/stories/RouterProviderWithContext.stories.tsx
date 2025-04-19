import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProviderWithContext } from '../components/RouterProviderWithContext';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Providers/RouterProviderWithContext',
    component: RouterProviderWithContext,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            const queryClient = new QueryClient();
            // Mock the auth data
            queryClient.setQueryData(['auth'], {
                user: {
                    id: '1',
                    username: 'demo-user',
                    email: 'demo@example.com',
                },
            });

            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            );
        },
    ],
} satisfies Meta<typeof RouterProviderWithContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
