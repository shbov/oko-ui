import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';

import { CreateForm } from './-components/create/CreateForm';

import type { FormValues } from './-components/constants';

export const Create = () => {
    const onSubmit = React.useCallback(
        async ({ value }: { value: FormValues }) => {
            console.log(value);

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
