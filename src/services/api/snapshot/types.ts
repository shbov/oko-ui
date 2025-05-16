export type ListSnapshotsRequest = {
    resourceId: string;
};

export interface Snapshot {
    id: string;
    time: string;
}

export type ListSnapshotsResponse = {
    snapshots: Snapshot[];
};

export type GetSnapshotRequest = {
    id: string;
};

export type GetSnapshotResponse = {
    snapshot: Snapshot;
};

export interface GetSnapshotTimesRequest {
    id: string;
    offset?: number;
    limit?: number;
}

export interface GetSnapshotTimesResponse {
    snapshots: Snapshot[];
}

export interface GetLastSnapshotIdRequest {
    id: string;
}

export interface GetLastSnapshotIdResponse {
    snapshot_id: number;
}

export interface GetResourcesForDiffRequest {
    id: string;
}

export interface GetHtmlResponse {
    html: string;
}

export interface GetTextResponse {
    text: string;
}

export interface GetScreenshotResponse {
    image: string;
}
