export interface EventFilter {
    types: ('keyword' | 'image')[];
    dateFrom: number;
    dateTo: number;
}
