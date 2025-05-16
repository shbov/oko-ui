import { Fragment, useCallback, useEffect, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { NotFound } from '@gravity-ui/illustrations';
import {
    PlaceholderContainer,
    Table,
    withTableActions,
    Pagination,
    Flex,
    spacing,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { PROJECT_FORMAT } from '~/constants/common';
import { listSnapshotTimesSource } from '~/data-sources/snapshot';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Snapshot } from '~/services/api/snapshot';
import { DataLoader } from '~/services/data-source';
import { t } from '~/services/i18n';

import { parseSnapshotId } from './-utils';

import type { TableColumnConfig } from '@gravity-ui/uikit';

const SnapshotsTable = withTableActions<Snapshot>(Table);

const columns: TableColumnConfig<Snapshot>[] = [
    {
        id: 'id',
        name: t('resources.snapshots.id'),
        template: ({ id }: Snapshot) => <Id id={id} />,
    },
    {
        id: 'time',
        name: t('resources.snapshots.time'),
        template: ({ time }: Snapshot) =>
            dateTimeParse(time)?.format(PROJECT_FORMAT),
    },
];

function RouteComponent() {
    const router = useRouter();
    const { resourceId } = Route.useParams();
    const [offset, setOffset] = useState(0);
    const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
    const pageSize = 40;

    const snapshotsQuery = useQueryData(listSnapshotTimesSource, {
        id: resourceId,
        offset,
        limit: pageSize,
    });

    useEffect(() => {
        if (snapshotsQuery.data) {
            if (snapshotsQuery.data.length < pageSize) {
                // We've reached the end of the list
                setTotalItems(offset + snapshotsQuery.data.length);
            } else if (totalItems === undefined) {
                // Initial load - set a temporary total that will be updated when we reach the end
                setTotalItems(offset + pageSize + 1);
            }
        }
    }, [snapshotsQuery.data, offset, pageSize, totalItems]);

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

    const handlePageChange = useCallback((page: number) => {
        setOffset((page - 1) * pageSize);
    }, []);

    return (
        <Page title={t('resources.snapshots.title')}>
            <DataLoader
                status={snapshotsQuery.status}
                error={snapshotsQuery.error}
                errorAction={snapshotsQuery.refetch}
            >
                {snapshotsQuery.data?.length ? (
                    <Fragment>
                        <SnapshotsTable
                            data={snapshotsQuery.data ?? []}
                            columns={columns}
                            onRowClick={onRowClick}
                        />
                    </Fragment>
                ) : (
                    <PlaceholderContainer
                        image={<NotFound />}
                        title={t('resources.snapshots.noSnapshots')}
                        size="m"
                        description={t(
                            'resources.snapshots.noSnapshotsDescription',
                        )}
                    />
                )}
                <Flex className={spacing({ mt: 4 })}>
                    <Pagination
                        page={Math.floor(offset / pageSize) + 1}
                        pageSize={pageSize}
                        compact
                        onUpdate={handlePageChange}
                        showPages={false}
                        total={totalItems}
                    />
                </Flex>
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute('/resources/$resourceId/snapshots/')(
    WithAuth({
        component: RouteComponent,
    }),
);
