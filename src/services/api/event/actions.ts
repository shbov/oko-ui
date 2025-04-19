import { getProtectedKyInstance } from '../utils';

import type {
    GetEventResponse,
    GetEventRequest,
    ListEventsResponse,
    ListEventsRequest,
    ListFilteredEventsRequest,
    ListFilteredEventsResponse,
} from './types';

const api = getProtectedKyInstance();

export const event = {
    listEvents: ({ resourceId }: ListEventsRequest) => {
        return api
            .get<ListEventsResponse>(`events/all`, {
                searchParams: {
                    resourceId,
                },
            })
            .json();
    },
    listFilteredEvents: ({
        resourceId,
        type,
        from,
        to,
    }: ListFilteredEventsRequest) => {
        return api
            .post<ListFilteredEventsResponse>(`events/filter`, {
                json: {
                    resource_ids: [resourceId],
                    event_type: type,
                    ...(from && { start_time: from }),
                    ...(to && { end_time: to }),
                },
            })
            .json();
    },
    getEvent: ({ id }: GetEventRequest) => {
        return api.get<GetEventResponse>(`events/${id}`).json();
    },
};
