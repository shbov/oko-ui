import type { Channel } from '~/services/api/notification/types';
import { ChannelType } from '~/services/api/notification/types';

import { ChannelTemplate } from '../components/ChannelTemplate';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Data Display/ChannelTemplate',
    component: ChannelTemplate,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChannelTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const createChannel = (type: ChannelType): Channel => ({
    type,
    id: '1',
    name: 'Test Channel',
    params: '{}',
});

export const Default: Story = {
    args: {
        channel: createChannel(ChannelType.Email),
    },
};

export const Telegram: Story = {
    args: {
        channel: createChannel(ChannelType.Telegram),
    },
};

export const NoChannel: Story = {
    args: {
        channel: undefined,
    },
};
