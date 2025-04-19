import { PageActionsProvider } from '../components/AppLayout/PageActionsContext';
import { Page } from '../components/Page';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Layout/Page',
    component: Page,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <PageActionsProvider>
                <Story />
            </PageActionsProvider>
        ),
    ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
    <div style={{ padding: '20px' }}>
        <h2>Sample Content</h2>
        <p>This is some sample content to demonstrate the Page layout.</p>
    </div>
);

export const Default: Story = {
    args: {
        title: 'Page Title',
        children: <SampleContent />,
    },
};

export const WithActions: Story = {
    args: {
        title: 'Page with Actions',
        children: <SampleContent />,
        primaryActions: [
            {
                text: 'Create New',
                onClick: () => console.log('Create clicked'),
            },
        ],
        secondaryActions: [
            {
                text: 'Export',
                onClick: () => console.log('Export clicked'),
            },
            {
                text: 'Import',
                onClick: () => console.log('Import clicked'),
            },
        ],
    },
};

export const Loading: Story = {
    args: {
        title: 'Loading Page',
        children: <SampleContent />,
        isLoading: true,
    },
};

export const WithCustomClass: Story = {
    args: {
        title: 'Custom Styled Page',
        children: <SampleContent />,
        className: 'custom-page-class',
    },
};
