import { useMemo } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { getResourcesForDiffSource } from '~/data-sources/snapshot';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { DiffComponent } from '~/routes/resources/-components/DiffComponent/DiffComponent';
import { DataLoader } from '~/services/data-source';

import { getSnapshotId } from '../-utils';

function RouteComponent() {
    const { snapshotId, resourceId } = Route.useParams();

    const currentSnapshotId = Number(snapshotId);

    const resourcesForDiffQuery = useQueryData(getResourcesForDiffSource, {
        id: getSnapshotId({
            resourceId,
            snapshotId: currentSnapshotId,
        }),
    });

    const previousResourcesForDiffQuery = useQueryData(
        getResourcesForDiffSource,
        {
            id: getSnapshotId({
                resourceId,
                snapshotId: currentSnapshotId - 1,
            }),
        },
        {
            enabled: currentSnapshotId > 0,
        },
    );

    const image = useMemo(() => {
        return `data:image/png;base64, ${resourcesForDiffQuery.data?.image ?? ''}`;
    }, [resourcesForDiffQuery.data?.image]);

    const oldImage = useMemo(() => {
        return `data:image/png;base64, ${previousResourcesForDiffQuery.data?.image ?? ''}`;
    }, [previousResourcesForDiffQuery.data?.image]);

    return (
        <Page title="Снимок ресурса">
            <DataLoader
                status={resourcesForDiffQuery.status}
                error={resourcesForDiffQuery.error}
                errorAction={resourcesForDiffQuery.refetch}
            >
                <DiffComponent
                    html={resourcesForDiffQuery.data?.html ?? ''}
                    oldHtml={previousResourcesForDiffQuery.data?.html ?? ''}
                    text={resourcesForDiffQuery.data?.text ?? ''}
                    oldText={previousResourcesForDiffQuery.data?.text ?? ''}
                    screenshot={image}
                    oldScreenshot={oldImage}
                    isFirst={currentSnapshotId === 1}
                />
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute(
    '/resources/$resourceId/snapshots/$snapshotId/',
)(
    WithAuth({
        component: RouteComponent,
    }),
);
