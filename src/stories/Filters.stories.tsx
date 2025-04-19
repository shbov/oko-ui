import { useEffect, useState } from 'react';

import { dateTimeParse } from '@gravity-ui/date-utils';

import { Filters } from '../routes/resources/$resourceId/events/-components/Filters';

import type { InitialValues } from '../routes/resources/$resourceId/events/-components/Filters';
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

const from = dateTimeParse('02.09.2003')!.subtract(7, 'day');
const to = dateTimeParse('02.09.2003')!;

// Wrapper component to handle state
const FiltersWrapper = ({
    multiple,
    initialValues,
}: {
    multiple?: boolean;
    initialValues: InitialValues;
}) => {
    const [filters, setFilters] = useState<EventFilter | null>(null);
    return (
        <div>
            <Filters
                setFilters={setFilters}
                multiple={multiple}
                initialValues={initialValues}
            />
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
        initialValues: {
            types: [],
            dateFrom: from,
            dateTo: to,
        },
    },
    render: (args) => (
        <FiltersWrapper multiple={false} initialValues={args.initialValues} />
    ),
};

export const WithInitialFilters: Story = {
    args: {
        setFilters: () => {},
        initialValues: {
            types: ['keyword'],
            dateFrom: from,
            dateTo: to,
        },
    },
    render: (args) => {
        const WrapperWithInitialFilters = () => {
            const [filters, setFilters] = useState<EventFilter | null>(null);

            useEffect(() => {
                args.setFilters(filters);
            }, [filters]);

            return (
                <div>
                    <Filters
                        setFilters={setFilters}
                        initialValues={args.initialValues}
                    />
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
        return <WrapperWithInitialFilters />;
    },
};

export const Multiple: Story = {
    args: {
        setFilters: () => {},
        multiple: true,
        initialValues: {
            types: ['keyword', 'image'],
            dateFrom: from,
            dateTo: to,
        },
    },
    render: (args) => (
        <FiltersWrapper
            multiple={args.multiple}
            initialValues={args.initialValues}
        />
    ),
};
