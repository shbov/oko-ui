import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.event.listFilteredEventsReal);
export const listEventsSource = makePlainQueryDataSource({
    name: 'listEvents',
    fetch,
    transformResponse: (response) => response.events,
});

const getEventFetch = skipContext(api.event.getEvent);
export const getEventSource = makePlainQueryDataSource({
    name: 'getEvent',
    fetch: getEventFetch,
    transformResponse: (response) => response.event,
});

const listFilteredEventsFetch = skipContext(api.event.listFilteredEvents);
export const listFilteredEventsSource = makePlainQueryDataSource({
    name: 'listFilteredEvents',
    fetch: listFilteredEventsFetch,
    transformResponse: (response) => response.events,
});
