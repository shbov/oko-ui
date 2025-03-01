import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';

import { CreateForm } from './-components/create/CreateForm';

import type { FormValues } from './-components/constants';

const prepareValues = ({
    name,
    description,
    url,
    channels,
    isScreenshot,
    sensitivity,
    keywords,
    zoneType,
    areas,
}: FormValues) => {
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

    if (isScreenshot) {
        return {
            ...commonValues,
            sensitivity,
            zoneType,
            areas,
        };
    }

    return commonValues;
};

export const Create = () => {
    const onSubmit = React.useCallback(
        async ({ value }: { value: FormValues }) => {
            const valuesToSend = prepareValues(value);

            console.log('valuesToSend', valuesToSend);
            await Promise.resolve();
        },
        [],
    );

    return (
        <Page title="Создать ресурс">
            <CreateForm onSubmit={onSubmit} />
        </Page>
    );
};

export const Route = createFileRoute('/resources/create')({
    component: Create,
    staticData: {
        crumb: 'Создать ресурс',
    },
});
