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

const api = getProtectedKyInstance(OKO.endpoints.userService);

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
            .get<GetScreenshotByUrlResponse>(`screenshot?url=${data.url}`)
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
            .patch<CreateResourceResponse>(`resources/${data.id}/edit`, {
                json: data,
            })
            .json();
    },
    get: ({ id }: GetResourceRequest) => {
        return api.get<GetResourceResponse>(`resources/${id}`).json();
    },
};
