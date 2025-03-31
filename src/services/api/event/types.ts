export interface GetEventRequest {
    id: string;
}

export interface GetEventResponse {
    event: Event;
}

export interface Event {
    id: string;
    name: string;
    description: string;
}
