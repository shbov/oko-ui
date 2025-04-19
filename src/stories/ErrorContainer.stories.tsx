import { ErrorContainer } from '../components/ErrorContainer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Feedback/ErrorContainer',
    component: ErrorContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ErrorContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const CustomTitle: Story = {
    args: {
        title: 'Connection Error',
        description:
            'Unable to connect to the server. Please check your internet connection.',
    },
};

export const CustomActions: Story = {
    args: {
        title: 'Session Expired',
        description: 'Your session has expired. Please log in again.',
        actions: [
            {
                text: 'Log In',
                onClick: () => console.log('Login clicked'),
            },
            {
                text: 'Cancel',
                onClick: () => console.log('Cancel clicked'),
            },
        ],
    },
};

export const WithoutImage: Story = {
    args: {
        title: 'No Results Found',
        description: "We couldn't find any matches for your search.",
        image: undefined,
    },
};
