import axios from 'axios';

import type { CreateResourceRequest } from './types';

const backendUrl = (url: string) => `${OKO.endpoints.userService}/${url}`;

export const resource = {
    create: (data: CreateResourceRequest) => {
        console.log('data', data);

        return axios.post(backendUrl('api/resource'), data);
    },
};
