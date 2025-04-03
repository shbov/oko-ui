import { useQueryData } from '@gravity-ui/data-source';
import { Table, withTableActions } from '@gravity-ui/uikit';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { listSnapshotsSource } from '~/data-sources/snapshot';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Snapshot } from '~/services/api/snapshot';
import { DataLoader } from '~/services/data-source';

import type { TableColumnConfig } from '@gravity-ui/uikit';

const SnapshotsTable = withTableActions<Snapshot>(Table);

const columns: TableColumnConfig<Snapshot>[] = [];

function RouteComponent() {
    const { resourceId } = Route.useParams();
    const snapshotsQuery = useQueryData(listSnapshotsSource, {
        resourceId,
    });

    return (
        <Page title="Снапшоты">
            <DataLoader
                status={snapshotsQuery.status}
                error={snapshotsQuery.error}
                errorAction={snapshotsQuery.refetch}
            >
                <SnapshotsTable
                    data={snapshotsQuery.data ?? []}
                    columns={columns}
                />
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute('/resources/$resourceId/snapshots/')(
    WithAuth({
        component: RouteComponent,
    }),
);
