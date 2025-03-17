import { useCallback, useMemo } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import {
    Table,
    withTableActions,
    Text,
    withTableCopy,
    withTableSorting,
} from '@gravity-ui/uikit';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { getResource } from '~/data-sources';
import { DataLoader } from '~/services/data-source';

import type { TableColumnConfig } from '@gravity-ui/uikit';

export const Route = createFileRoute('/resources/$resourceId/_authenticated/')({
    component: RouteComponent,
    staticData: {
        crumb: 'Ресурс',
    },
});

interface Event {
    id: string;
    date: Date;
}

const data: Event[] = [
    {
        date: new Date(),
        id: '8b863569-81f6-4366-a1aa-3989a5836b08',
    },
];

const columns: TableColumnConfig<Event>[] = [
    {
        id: 'id',
        name: 'ID',
        template: ({ id }) => <Text>{id}</Text>,
        meta: {
            copy: ({ id }: Event) => id,
            sort: true,
        },
    },
    {
        id: 'date',
        name: 'Дата события',
        template: ({ date }) => <Text>{date.toLocaleString('ru')}</Text>,
        meta: {
            sort: true,
        },
    },
];

const EventsTable = withTableSorting(
    withTableCopy(withTableActions<Event>(Table)),
);

function RouteComponent() {
    const { resourceId } = Route.useParams();
    const navigate = useNavigate();

    const { data: resource, ...resourceQuery } = useQueryData(getResource, {
        id: resourceId,
    });

    const title = useMemo(() => {
        return `Ресурс ${resource?.resource?.name ?? ''}`;
    }, [resource?.resource?.name]);

    const onRowClick = useCallback(
        (event: Event) => {
            void navigate({
                to: `/resources/${resourceId}/events/${event.id}`,
            });
        },
        [navigate, resourceId],
    );

    return (
        <Page title={title} isLoading={resourceQuery.isLoading}>
            <DataLoader
                error={resourceQuery.error}
                status={resourceQuery.status}
                errorAction={resourceQuery.refetch}
            >
                <EventsTable
                    data={data}
                    columns={columns}
                    onRowClick={onRowClick}
                />
            </DataLoader>
        </Page>
    );
}
