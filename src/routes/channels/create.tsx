import { useCallback } from 'react';

import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { listChannelsSource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import { dataManager } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import { CreateForm } from './-components/form/CreateForm';
import { prepareCreateValue } from './-components/utils';

import type { CreateFormValues } from './-components/constants';

export const Create = () => {
    const handleError = useApiError();
    const router = useRouter();

    const onSubmit = useCallback(
        ({ value }: { value: CreateFormValues }) => {
            const valuesToSend = prepareCreateValue(value);

            api.notification
                .createChannel(valuesToSend)
                .then((r) => {
                    toaster.add({
                        name: 'channel-created',
                        title: t('channels.created'),
                        content: t('channels.createdContent', {
                            id: r.channel?.id,
                        }),
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
        <Page title={t('channels.create')}>
            <CreateForm onSubmit={onSubmit} />
        </Page>
    );
};

export const Route = createFileRoute('/channels/create')(
    WithAuth({
        component: Create,
        loader: () => {
            return {
                crumb: t('crumb.createChannel'),
            };
        },
    }),
);
