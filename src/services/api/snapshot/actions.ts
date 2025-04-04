import { getProtectedKyInstance } from '../utils';

import type {
    GetSnapshotRequest,
    GetSnapshotResponse,
    ListSnapshotsRequest,
    ListSnapshotsResponse,
} from './types';

const api = getProtectedKyInstance();

export const snapshot = {
    listSnapshots: ({ resourceId }: ListSnapshotsRequest) => {
        return api
            .get<ListSnapshotsResponse>(
                `snapshots/all?resourceId=${resourceId}`,
            )
            .json();
    },
    getSnapshot: ({ id }: GetSnapshotRequest) => {
        return api.get<GetSnapshotResponse>(`snapshots/${id}`).json();
    },
};
