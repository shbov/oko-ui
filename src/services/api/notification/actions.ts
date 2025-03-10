import { getProtectedKyInstance } from '../utils';

import type { listChannelsResponse } from './types';

const api = getProtectedKyInstance(OKO.endpoints.userService);

export const notification = {
    listChannels: () => {
        return api.get<listChannelsResponse>(`channels`).json();
    },
};
