import { EventStatus } from '../EventStatus';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EventStatus> = {
    title: 'Components/EventStatus',
    component: EventStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        status: {
            control: 'select',
            options: ['CREATED', 'NOTIFIED', 'WATCHED', 'REACTED', undefined],
            description: 'Статус события',
        },
    },
};

export default meta;
type Story = StoryObj<typeof EventStatus>;

// История для статуса "Создано"
export const Created: Story = {
    args: {
        status: 'CREATED',
    },
};

// История для статуса "Отправлено"
export const Notified: Story = {
    args: {
        status: 'NOTIFIED',
    },
};

// История для статуса "Просмотрено"
export const Watched: Story = {
    args: {
        status: 'WATCHED',
    },
};

// История для статуса "Отреагировано"
export const Reacted: Story = {
    args: {
        status: 'REACTED',
    },
};

// История для неизвестного статуса
export const Unknown: Story = {
    args: {
        status: undefined,
    },
};

// История для демонстрации всех статусов
export const AllStatuses: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <EventStatus status="CREATED" />
            <EventStatus status="NOTIFIED" />
            <EventStatus status="WATCHED" />
            <EventStatus status="REACTED" />
            <EventStatus status={undefined} />
        </div>
    ),
};
