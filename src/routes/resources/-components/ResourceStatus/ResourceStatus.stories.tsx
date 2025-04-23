import { dateTimeParse } from '@gravity-ui/date-utils';

import { ResourceStatus } from '../ResourceStatus';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResourceStatus> = {
    title: 'Components/ResourceStatus',
    component: ResourceStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        enabled: {
            control: 'boolean',
            description: 'Включен ли мониторинг ресурса',
        },
        startDate: {
            control: 'date',
            description: 'Дата начала мониторинга',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ResourceStatus>;

// История для активного ресурса
export const Active: Story = {
    args: {
        enabled: true,
        startDate: dateTimeParse('2024-01-01'),
    },
};

// История для ресурса, ожидающего начала мониторинга
export const Waiting: Story = {
    args: {
        enabled: true,
        startDate: dateTimeParse('2025-01-01'),
    },
};

// История для неактивного ресурса
export const Inactive: Story = {
    args: {
        enabled: false,
        startDate: dateTimeParse('2024-01-01'),
    },
};

// История для ресурса без даты начала
export const NoStartDate: Story = {
    args: {
        enabled: true,
        startDate: undefined,
    },
};

// История для демонстрации всех состояний
export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <ResourceStatus
                enabled={true}
                startDate={dateTimeParse('2024-01-01')}
            />
            <ResourceStatus
                enabled={true}
                startDate={dateTimeParse('2025-01-01')}
            />
            <ResourceStatus
                enabled={false}
                startDate={dateTimeParse('2024-01-01')}
            />
            <ResourceStatus enabled={true} startDate={undefined} />
        </div>
    ),
};
