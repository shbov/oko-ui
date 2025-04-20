import { useCallback } from 'react';

import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { listChannelsSource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import type { CreateChannelResponse } from '~/services/api/notification';
import { dataManager } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { CreateForm } from './-components/form/CreateForm';
import { prepareCreateValue } from './-components/utils';

import type { CreateFormValues } from './-components/constants';

export const Create = () => {
    const handleError = useApiError();
    const router = useRouter();

    const onSubmit = useCallback(
        ({ value }: { value: CreateFormValues }) => {
            api.notification
                .createChannel(prepareCreateValue(value))
                .then((r: CreateChannelResponse) => {
                    toaster.add({
                        name: 'channel-created',
                        title: 'Канал создан',
                        content: `Канал с ID ${r.channel?.id} был успешно создан`,
                        theme: 'success',
                    });

                    void dataManager.invalidateSource(listChannelsSource);

                    void router.navigate({
                        to: `/channels/${r.channel?.id}`,
                    });
                })
                .catch(handleError);
        },
        [handleError, router],
    );

    return (
        <Page title="Создать канал">
            <CreateForm onSubmit={onSubmit} />
        </Page>
    );
};

export const Route = createFileRoute('/channels/create')(
    WithAuth({
        component: Create,
        loader: () => {
            return {
                crumb: 'Создать канал',
            };
        },
    }),
);
