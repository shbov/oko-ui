import { useCallback } from 'react';

import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import { toaster } from '~/services/toaster';

import { CreateForm } from './-components/form/CreateForm';
import { prepareCreateValues } from './-components/utils';

import type { CreateFormValues } from './-components/constants';

export const Create = () => {
    const handleError = useApiError();
    const router = useRouter();

    const onSubmit = useCallback(
        ({ value }: { value: CreateFormValues }) => {
            const valuesToSend = prepareCreateValues(value);

            api.resource
                .create(valuesToSend)
                .then((r) => {
                    toaster.add({
                        name: 'resource-created',
                        title: 'Ресурс создан',
                        content: `Ресурс с ID ${r.resource?.id} был успешно создан`,
                        theme: 'success',
                    });

                    void router.navigate({
                        to: `/resources/${r.resource?.id}`,
                    });
                })
                .catch(handleError);
        },
        [handleError, router],
    );

    return (
        <Page title="Создать ресурс">
            <CreateForm onSubmit={onSubmit} />
        </Page>
    );
};

export const Route = createFileRoute('/resources/create')(
    WithAuth({
        component: Create,
        loader: () => {
            return {
                crumb: 'Создать ресурс',
            };
        },
    }),
);
