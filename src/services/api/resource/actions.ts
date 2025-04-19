import { getProtectedKyInstance } from '../utils';

import type {
    CreateResourceRequest,
    CreateResourceResponse,
    EditResourceRequest,
    GetResourceRequest,
    GetResourceResponse,
    GetScreenshotByUrlRequest,
    GetScreenshotByUrlResponse,
    ListResourcesResponse,
} from './types';

const api = getProtectedKyInstance();

export const resource = {
    create: (data: CreateResourceRequest) => {
        return api
            .post<CreateResourceResponse>('resources/create', {
                json: data,
            })
            .json();
    },
    getScreenshotByUrl: async (data: GetScreenshotByUrlRequest) => {
        return api
            .post<GetScreenshotByUrlResponse>(`screenshot`, {
                json: {
                    url: data.url,
                },
            })
            .json();
    },
    listResources: () => {
        return api.get<ListResourcesResponse>('resources/all').json();
    },
    deleteResource: (id: string) => {
        return api.delete(`resources/${id}`).json();
    },
    edit: (data: EditResourceRequest) => {
        return api
            .patch<CreateResourceResponse>(`resources/${data.id}`, {
                json: data,
            })
            .json();
    },
    get: ({ id }: GetResourceRequest) => {
        return api.get<GetResourceResponse>(`resources/${id}`).json();
    },
};
