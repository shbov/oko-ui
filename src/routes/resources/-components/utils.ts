import { ZoneType, type CreateResourceRequest } from '~/api/resource';

import { type FormValues } from './constants';

const prepareAreas = (areas: FormValues['areas']) => {
    return areas?.map((area) => ({
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height,
    })) ?? [];
};

export const prepareValues = ({
    name,
    description,
    url,
    channels,
    isScreenshot,
    sensitivity,
    keywords,
    zoneType,
    areas,
}: FormValues): CreateResourceRequest => {
    const parsedKeywords = keywords
        ? keywords
                .split(',')
                .map((keyword) => keyword.trim())
                .filter(Boolean)
        : [];

    const commonValues = {
        name,
        description,
        url,
        channels,
        keywords: parsedKeywords,
    };

    if (!isScreenshot) {
        return commonValues;
    }

    return {
        ...commonValues,
        sensitivity,
        zoneType,
        ...(zoneType === ZoneType.fullPage
            ? {}
            : {
                    areas: prepareAreas(areas),
                }),
    };
};
