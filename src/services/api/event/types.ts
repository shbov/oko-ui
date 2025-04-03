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
    snapshot_id: string;
    resource_id: string;
    status: 'CREATED' | 'NOTIFIED' | 'WATCHED' | 'REACTED';
    created_at: string;
}
