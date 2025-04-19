import { getProtectedKyInstance } from '../utils';

import type {
    GetLastSnapshotIdResponse,
    GetSnapshotRequest,
    GetSnapshotResponse,
    GetSnapshotTimesRequest,
    GetSnapshotTimesResponse,
    GetLastSnapshotIdRequest,
    GetResourcesForDiffRequest,
    GetHtmlResponse,
    GetTextResponse,
    GetScreenshotResponse,
} from './types';

const api = getProtectedKyInstance();

export const snapshot = {
    getSnapshot: ({ id }: GetSnapshotRequest) => {
        return api.get<GetSnapshotResponse>(`snapshots/${id}`).json();
    },
    listSnapshotTimes: ({ id }: GetSnapshotTimesRequest) => {
        return api
            .get<GetSnapshotTimesResponse>(`resources/${id}/snapshot_times`)
            .json();
    },
    getLastSnapshotId: ({ id }: GetLastSnapshotIdRequest) => {
        return api
            .get<GetLastSnapshotIdResponse>(`resources/${id}/last_snapshot_id`)
            .json();
    },
    getResourcesForDiff: ({ id }: GetResourcesForDiffRequest) => {
        const promises = [
            api.get<GetHtmlResponse>(`events/${id}/html`).json(),
            api.get<GetTextResponse>(`events/${id}/text`).json(),
            api.get<GetScreenshotResponse>(`events/${id}/screenshot`).json(),
        ];

        return Promise.all(promises).then(([html, text, screenshot]) => {
            return {
                html: html as GetHtmlResponse,
                text: text as GetTextResponse,
                screenshot: screenshot as GetScreenshotResponse,
            };
        });
    },
};
