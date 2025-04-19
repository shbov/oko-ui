import {
    ZoneType,
    type CreateResourceRequest,
    type EditResourceRequest,
} from '~/services/api/resource';

import type { CreateFormValues, EditFormValues } from './constants';

const prepareAreas = (areas: CreateFormValues['areas']) => {
    return (
        areas?.map((area) => ({
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height,
        })) ?? []
    );
};

export const prepareCreateValues = ({
    name,
    description,
    url,
    channels,
    isScreenshot,
    sensitivity,
    keywords,
    zoneType,
    areas,
    interval,
    startDate,
}: CreateFormValues) => {
    const parsedKeywords = keywords
        ? keywords
              .split(',')
              .map((keyword) => keyword.trim())
              .filter(Boolean)
        : [];

    const patchedInterval: CreateResourceRequest['interval'] = {
        day_of_week: interval.dayOfWeek,
        days: interval.days,
        hours: interval.hours,
        minutes: interval.minutes,
        months: interval.months,
    };

    const commonValues = {
        name,
        description,
        url,
        channels,
        keywords: parsedKeywords,
        interval: patchedInterval,
        starts_from: Math.round(startDate?.getTime() / 1000),
    };

    if (!isScreenshot) {
        return commonValues;
    }

    return {
        ...commonValues,
        sensitivity,
        zone_type: zoneType,
        ...(zoneType === ZoneType.fullPage
            ? {}
            : { areas: prepareAreas(areas) }),
    };
};

export const prepareEditValues = (
    values: EditFormValues,
    id: string,
): EditResourceRequest => {
    return {
        ...prepareCreateValues(values),
        id,
    };
};
