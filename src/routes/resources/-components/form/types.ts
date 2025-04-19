import type { Resource, ZoneType } from '~/services/api/resource';

import type { CreateFormValues, EditFormValues } from '../constants';

export interface CreateFormProps {
    onSubmit: ({ value }: { value: CreateFormValues }) => void;
}

export interface EditFormProps {
    onSubmit: ({ value }: { value: EditFormValues }) => void;
    resource: Resource;
}

export interface CommonFormValues {
    name: string;
    description?: string;
    url: string;
    keywords: string;
    channels: string[];
    interval: {
        dayOfWeek: string;
        days: string;
        hours: string;
        minutes: string;
        months: string;
    };
    isScreenshot: boolean;
    zoneType?: ZoneType;
    areas?: {
        x: number;
        y: number;
        width: number;
        height: number;
    }[];
    startDate: Date;
    sensitivity?: number;
}
