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
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import type { Event } from '~/services/api/event';
import { DataLoader } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import { Filters } from './-components/Filters';
import { eventColumns } from './-components/templates';
import { downloadReport } from './-utils';

import type { EventFilter } from './-components/Filters/types';

const EventsTable = withTableSorting(
    withTableCopy(withTableSelection(withTableActions<Event>(Table))),
);

function RouteComponent() {
    const router = useRouter();
    const handleError = useApiError();

    const { resourceId } = Route.useParams();
    const [filters, setFilters] = useState<EventFilter | null>(null);
    const [ids, setIds] = useState<string[]>([]);

    const eventsQuery = useQueryData(listFilteredEventsSource, {
        resourceId: resourceId,
        type: filters?.types[0],
        from: filters?.dateFrom ?? 0,
        to: filters?.dateTo ?? 0,
        eventIds: ids,
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
                onClick: async () => {
                    await api.event
                        .downloadEventsCsv({
                            eventIds: ids,
                        })
                        .then((response) => {
                            toaster.add({
                                name: 'events-csv',
                                title: t(
                                    'resources.events.createReportSuccess',
                                ),
                                content: t(
                                    'resources.events.createReportSuccessMessage',
                                ),
                                theme: 'success',
                            });

                            downloadReport(response);
                        })
                        .catch(handleError);
                },
            },
        ],
        [handleError, ids],
    );

    return (
        <Page
            title={t('resources.events.title')}
            primaryActions={primaryActions}
        >
            <Filters
                setFilters={setFilters}
                initialValues={{
                    types: [],
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
                        getRowId={(item) => item.id}
                    />
                ) : (
                    <PlaceholderContainer
                        image={<Database />}
                        title={t('resources.events.noEvents')}
                        description={t('resources.events.noEventsDescription')}
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
