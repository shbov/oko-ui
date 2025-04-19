import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '../components/ReactQueryDevtools';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Development/ReactQueryDevtools',
    component: ReactQueryDevtools,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            const queryClient = new QueryClient();
            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            );
        },
    ],
} satisfies Meta<typeof ReactQueryDevtools>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithInitialOpen: Story = {
    args: {},
    render: () => {
        const queryClient = new QueryClient();
        return (
            <QueryClientProvider client={queryClient}>
                <div style={{ padding: '20px' }}>
                    <h3>React Query Devtools</h3>
                    <p>
                        The devtools panel will be initially open in this story.
                    </p>
                    <ReactQueryDevtools />
                </div>
            </QueryClientProvider>
        );
    },
};
