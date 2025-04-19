import { useState } from 'react';

import { Filters } from '../routes/resources/$resourceId/events/-components/Filters';

import type { EventFilter } from '../routes/resources/$resourceId/events/-components/Filters/types';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Data Entry/Filters',
    component: Filters,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
const FiltersWrapper = () => {
    const [filters, setFilters] = useState<EventFilter>({});
    return (
        <div>
            <Filters setFilters={setFilters} />
            <div
                style={{
                    marginTop: '20px',
                    padding: '10px',
                }}
            >
                <h4>Current Filters:</h4>
                <pre>{JSON.stringify(filters, null, 2)}</pre>
            </div>
        </div>
    );
};

export const Default: Story = {
    args: {
        setFilters: () => {},
    },
    render: () => <FiltersWrapper />,
};

export const WithInitialFilters: Story = {
    args: {
        setFilters: () => {},
    },
    render: () => {
        const WrapperWithInitialFilters = () => {
            const [filters, setFilters] = useState<EventFilter>({
                status: ['CREATED', 'NOTIFIED'],
                search: 'test-123',
            });
            return (
                <div>
                    <Filters setFilters={setFilters} />
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '10px',
                            background: '#f5f5f5',
                        }}
                    >
                        <h4>Current Filters:</h4>
                        <pre>{JSON.stringify(filters, null, 2)}</pre>
                    </div>
                </div>
            );
        };
        return <WrapperWithInitialFilters />;
    },
};
