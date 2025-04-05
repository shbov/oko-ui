import { Id } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Components/Id',
    component: Id,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Id>;

export default meta;
type Story = StoryObj<typeof Id>;

export const Default: Story = {
    args: {
        id: 'abc-123-xyz',
    },
};

export const LongId: Story = {
    args: {
        id: 'very-long-id-123456789-abcdef-987654321',
    },
};

export const ShortId: Story = {
    args: {
        id: 'x1y2z3',
    },
};

export const NumericId: Story = {
    args: {
        id: '123456',
    },
};
