export enum ZoneType {
    fullPage = 'fullPage',
    zone = 'zone',
}

export interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface CreateResourceRequest {
    name: string;
    description?: string | undefined;
    url: string;
    channels: string[];
    keywords: string[];
    areas?: Area[] | undefined;
    sensitivity?: number;
    zoneType?: ZoneType;
}

export interface CreateResourceResponse {
    id: string;
}
