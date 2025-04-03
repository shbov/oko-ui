import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetchSnapshots = skipContext(api.snapshot.listSnapshots);
export const listSnapshotsSource = makePlainQueryDataSource({
    name: 'resource',
    fetch: fetchSnapshots,
    transformResponse: (response) => response.snapshots,
});
