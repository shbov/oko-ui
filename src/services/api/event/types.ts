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
    type: 'text' | 'image';
    resource_id: string;
    status: 'CREATED' | 'NOTIFIED' | 'WATCHED' | 'REACTED';
    created_at: string;
}

export interface ListFilteredEventsRequest {
    resourceId: string;
    type: 'keyword' | 'image';
    from: number;
    to: number;
}

export interface ListFilteredEventsResponse {
    events: Event[];
}
