export interface GetEventRequest {
    id: string;
}

export interface ListEventsRequest {
    resourceId: string;
}

export interface ListEventsResponse {
    events: Event[];
}

export interface GetEventResponse {
    event: Event;
}

export interface Event {
    id: string;
    name: string;
    date: Date;
}
