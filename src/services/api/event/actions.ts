import { getProtectedKyInstance } from '../utils';

import type {
    GetEventResponse,
    GetEventRequest,
    ListEventsResponse,
    ListEventsRequest,
    ListFilteredEventsRequest,
    DownloadEventsCsvRequest,
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
    listFilteredEventsReal: ({
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
    listFilteredEvents: async ({
        resourceId,
        type,
        from,
        to,
        eventIds,
    }: ListFilteredEventsRequest) => {
        return api
            .post<ListFilteredEventsResponse>('events/filter', {
                json: {
                    resource_ids: [resourceId],
                    ...(type && { event_type: type }),
                    ...(from && { start_time: from }),
                    ...(to && { end_time: to }),
                    ...(eventIds &&
                        eventIds.length > 0 && { event_ids: eventIds }),
                },
            })
            .json();
    },
    getEvent: ({ id }: GetEventRequest) => {
        return api.get<GetEventResponse>(`events/${id}`).json();
    },
    downloadEventsCsv: async ({ eventIds }: DownloadEventsCsvRequest) => {
        return api
            .post('report', {
                json: {
                    event_ids: eventIds,
                },
            })
            .blob()
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'events.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            });
    },
};
