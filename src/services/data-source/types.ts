export interface QueryError {
    name?: string;
    message?: string;
    error?: string; // TODO: should be removed on backend in favor if name & message.
}
