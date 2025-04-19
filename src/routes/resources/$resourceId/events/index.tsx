import { useCallback, useState, useMemo } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Database } from '@gravity-ui/illustrations';
import {
    PlaceholderContainer,
    Table,
    withTableActions,
    withTableCopy,
    withTableSelection,
    withTableSorting,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { listFilteredEventsSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Event } from '~/services/api/event';
import { DataLoader } from '~/services/data-source';

import { Filters } from './-components/Filters';
import { eventColumns } from './-components/templates';

import type { EventFilter } from './-components/Filters/types';

const EventsTable = withTableSorting(
    withTableCopy(withTableSelection(withTableActions<Event>(Table))),
);

function RouteComponent() {
    const router = useRouter();

    const { resourceId } = Route.useParams();
    const [filters, setFilters] = useState<EventFilter | null>(null);
    const [ids, setIds] = useState<string[]>([]);

    const eventsQuery = useQueryData(listFilteredEventsSource, {
        resourceId: resourceId,
        type: filters?.types[0] ?? 'keyword',
        from: filters?.dateFrom ?? 0,
        to: filters?.dateTo ?? 0,
    });

    const onRowClick = useCallback(
        (item: Event) => {
            void router.navigate({
                to: '/resources/$resourceId/events/$eventId',
                params: { eventId: item.id },
            });
        },
        [router],
    );

    const primaryActions = useMemo(
        () => [
            {
                text: 'Создать отчет',
                disabled: ids.length === 0,
                onClick: () => {
                    console.log(ids);
                },
            },
        ],
        [ids],
    );

    return (
        <Page title="События ресурса" primaryActions={primaryActions}>
            <Filters
                setFilters={setFilters}
                initialValues={{
                    types: ['keyword'],
                    dateFrom: dateTimeParse('now')!.subtract(7, 'day'),
                    dateTo: dateTimeParse('now')!,
                }}
            />

            <DataLoader
                status={eventsQuery.status}
                error={eventsQuery.error}
                errorAction={eventsQuery.refetch}
            >
                {eventsQuery.data && eventsQuery.data.length > 0 ? (
                    <EventsTable
                        data={eventsQuery.data ?? []}
                        columns={eventColumns}
                        onSelectionChange={setIds}
                        selectedIds={ids}
                        onRowClick={onRowClick}
                    />
                ) : (
                    <PlaceholderContainer
                        image={<Database />}
                        title="Событий еще нет"
                        description="События появятся после создания ресурса"
                    />
                )}
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute('/resources/$resourceId/events/')(
    WithAuth({
        component: RouteComponent,
    }),
);
