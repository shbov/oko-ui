import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { api } from '~/api';
import { Page } from '~/components/Page';
import { useApiError } from '~/hooks/toasters';

import { CreateForm } from './-components/create/CreateForm';
import { prepareValues } from './-components/utils';

import type { FormValues } from './-components/constants';

export const Create = () => {
    const handleError = useApiError();

    const onSubmit = React.useCallback(
        ({ value }: { value: FormValues }) => {
            const valuesToSend = prepareValues(value);

            api.resource.create(valuesToSend).catch(handleError);
        },
        [handleError],
    );

    return (
        <Page title="Создать ресурс">
            <CreateForm onSubmit={onSubmit} />
        </Page>
    );
};

export const Route = createFileRoute('/resources/_authenticated/create')({
    component: Create,
    staticData: {
        crumb: 'Создать ресурс',
    },
});
