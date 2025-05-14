export enum ZoneType {
    fullPage = 'fullPage',
    zone = 'zone',
}

export interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
    sensitivity?: number;
}

export interface CreateResourceRequest {
    name: string;
    description?: string | undefined;
    url: string;
    channels: string[];
    keywords: string[];
    areas?: Area[] | undefined;
    sensitivity?: number;
    zone_type?: ZoneType;
    interval: {
        day_of_week: string;
        days: string;
        hours: string;
        minutes: string;
        months: string;
    };
}

export interface Resource {
    id: string;
    name: string;
    enabled: boolean;
    description: string | undefined;
    url: string;
    channels: string[];
    keywords: string[];
    interval: string;
    make_screenshot: boolean;
    polygon: unknown;
    areas?:
        | {
              sensitivity?: number;
          }
        | Area[]
        | undefined;
    starts_from: number | undefined;
}

export interface CreateResourceResponse {
    resource: Resource;
}

export interface GetScreenshotByUrlRequest {
    url: string;
}

export interface GetScreenshotByUrlResponse {
    screenshot: string;
}

export interface ListResourcesResponse {
    resources: Resource[];
}

export interface EditResourceRequest {
    id: string;
    enabled?: boolean;
    name?: string;
    description?: string | undefined;
    url?: string;
    channels?: string[];
    keywords?: string[];
    areas?: Area[] | undefined;
    sensitivity?: number;
    zone_type?: ZoneType;
    interval?: {
        day_of_week: string;
        days: string;
        hours: string;
        minutes: string;
        months: string;
    };
}

export interface GetResourceResponse {
    resource: Resource;
}

export interface GetResourceRequest {
    id: string;
}
