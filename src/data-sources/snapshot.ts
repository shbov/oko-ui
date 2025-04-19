import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetchSnapshotTimes = skipContext(api.snapshot.listSnapshotTimes);
export const listSnapshotTimesSource = makePlainQueryDataSource({
    name: 'snapshot_times',
    fetch: fetchSnapshotTimes,
    transformResponse: (response) => response.snapshots,
});

const fetchLastSnapshotId = skipContext(api.snapshot.getLastSnapshotId);
export const getLastSnapshotIdSource = makePlainQueryDataSource({
    name: 'last_snapshot_id',
    fetch: fetchLastSnapshotId,
    transformResponse: (response) => response.snapshot_id,
});

const fetchResourcesForDiff = skipContext(api.snapshot.getResourcesForDiff);
export const getResourcesForDiffSource = makePlainQueryDataSource({
    name: 'resources_for_diff',
    fetch: fetchResourcesForDiff,
    transformResponse: (response) => ({
        html: response.html.html,
        text: response.text.text,
        image: response.screenshot.image,
    }),
});
