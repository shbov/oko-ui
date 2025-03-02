import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { api } from '~/api';
import { Page } from '~/components/Page';
import { toaster } from '~/services/toaster';

import { type FormValues } from './-components/constants';
import { CreateForm } from './-components/create/CreateForm';
import { prepareValues } from './-components/utils';

import type { AxiosError } from 'axios';

export const Create = () => {
    const onSubmit = React.useCallback(
        ({ value }: { value: FormValues }) => {
            const valuesToSend = prepareValues(value);

            api.resource.create(valuesToSend).catch((err) => {
                toaster.add({
                    name: 'create-error',
                    title: 'Ошибка',
                    theme: 'danger',
                    content: (err as AxiosError).message,
                });
            });
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
