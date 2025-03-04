import axios from 'axios';

import type {
    CreateResourceRequest,
    GetScreenshotByUrlRequest,
    GetScreenshotByUrlResponse,
} from './types';

const backendUrl = (url: string) => `${OKO.endpoints.userService}/${url}`;

// TODO: think about JWT-tokens here. Maybe we need custom wrap for axios requests.
export const resource = {
    create: (data: CreateResourceRequest) => {
        console.log('data', data);

        return axios.post(backendUrl('api/resource'), data);
    },
    getScreenshotByUrl: async ({ url }: GetScreenshotByUrlRequest) => {
        return axios.get<GetScreenshotByUrlResponse>(
            backendUrl(`api/getScreenshot?url=${url}`),
        );
    },
};
