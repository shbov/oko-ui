export type ListSnapshotsRequest = {
    resourceId: string;
};

export type ListSnapshotsResponse = {
    snapshots: Snapshot[];
};

export type Snapshot = {
    id: string;
};

export type GetSnapshotRequest = {
    id: string;
};

export type GetSnapshotResponse = {
    snapshot: Snapshot;
};
