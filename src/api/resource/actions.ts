import { getProtectedKyInstance } from '../utils';

import type {
    CreateResourceRequest,
    GetScreenshotByUrlRequest,
    GetScreenshotByUrlResponse,
} from './types';

const api = getProtectedKyInstance(OKO.endpoints.userService);

export const resource = {
    create: (data: CreateResourceRequest) => {
        console.log('data', data);

        return api.post('resource/create', { json: data }).json();
    },
    getScreenshotByUrl: async (data: GetScreenshotByUrlRequest) => {
        return api.post<GetScreenshotByUrlResponse>(
            `getScreenshot`,
            { json: data },
        ).json();
    },
};
