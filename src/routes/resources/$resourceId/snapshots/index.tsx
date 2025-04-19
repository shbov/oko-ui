import { useCallback } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { NotFound } from '@gravity-ui/illustrations';
import {
    PlaceholderContainer,
    Table,
    withTableActions,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { PROJECT_FORMAT } from '~/constants/common';
import { listSnapshotTimesSource } from '~/data-sources/snapshot';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Snapshot } from '~/services/api/snapshot';
import { DataLoader } from '~/services/data-source';

import { parseSnapshotId } from './-utils';

import type { TableColumnConfig } from '@gravity-ui/uikit';

const SnapshotsTable = withTableActions<Snapshot>(Table);

const columns: TableColumnConfig<Snapshot>[] = [
    {
        id: 'id',
        name: 'ID',
        template: ({ id }: Snapshot) => <Id id={id} />,
    },
    {
        id: 'time',
        name: 'Время',
        template: ({ time }: Snapshot) =>
            dateTimeParse(time)?.format(PROJECT_FORMAT),
    },
];

function RouteComponent() {
    const router = useRouter();
    const { resourceId } = Route.useParams();

    const snapshotsQuery = useQueryData(listSnapshotTimesSource, {
        id: resourceId,
    });

    const onRowClick = useCallback(
        (snapshot: Snapshot) => {
            void router.navigate({
                to: '/resources/$resourceId/snapshots/$snapshotId',
                params: {
                    resourceId,
                    snapshotId: parseSnapshotId(snapshot.id),
                },
            });
        },
        [router, resourceId],
    );

    return (
        <Page title="Снимки ресурса">
            <DataLoader
                status={snapshotsQuery.status}
                error={snapshotsQuery.error}
                errorAction={snapshotsQuery.refetch}
            >
                {snapshotsQuery.data?.length ? (
                    <SnapshotsTable
                        data={snapshotsQuery.data ?? []}
                        columns={columns}
                        onRowClick={onRowClick}
                    />
                ) : (
                    <PlaceholderContainer
                        image={<NotFound />}
                        title="Проверок еще не было"
                        size="m"
                        description="Снимки появятся после начала мониторинга"
                    />
                )}
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute('/resources/$resourceId/snapshots/')(
    WithAuth({
        component: RouteComponent,
    }),
);
