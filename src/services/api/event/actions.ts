import { getProtectedKyInstance } from '../utils';

import type {
    GetEventResponse,
    GetEventRequest,
    ListEventsResponse,
    ListEventsRequest,
} from './types';

const api = getProtectedKyInstance(OKO.endpoints.userService);

export const event = {
    listEvents: ({ resourceId }: ListEventsRequest) => {
        return api
            .get<ListEventsResponse>(`events/all?resourceId=${resourceId}`)
            .json();
    },
    getEvent: ({ id }: GetEventRequest) => {
        return api.get<GetEventResponse>(`events/${id}`).json();
    },
};
