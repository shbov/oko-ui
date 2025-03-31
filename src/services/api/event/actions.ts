import { getProtectedKyInstance } from '../utils';

import type { GetEventResponse, GetEventRequest } from './types';

const api = getProtectedKyInstance(OKO.endpoints.userService);

export const event = {
    getEvent: ({ id }: GetEventRequest) => {
        return api.get<GetEventResponse>(`events/${id}`).json();
    },
};
