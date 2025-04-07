import { useCallback } from 'react';

import { useDataManager, useQueryData } from '@gravity-ui/data-source';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { getChannelSource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { EditFormValues } from '~/routes/channels/-components/constants';
import { api } from '~/services/api';
import { DataLoader } from '~/services/data-source/components/DataLoader';
import { toaster } from '~/services/toaster';

import { EditForm } from '../-components/form/EditForm';
import { prepareEditValue } from '../-components/utils';

export const Edit = () => {
    const router = useRouter();
    const handleError = useApiError();
    const params = Route.useParams();
    const dataManager = useDataManager();

    const { data: channel, ...channelQuery } = useQueryData(getChannelSource, {
        id: params.channelId,
    });

    const handleSubmit = useCallback(
        ({ value }: { value: EditFormValues }) => {
            api.notification
                .editChannel(prepareEditValue(value, params.channelId))
                .then(() => {
                    toaster.add({
                        name: 'channel-edited',
                        title: 'Канал изменен',
                        content: `Канал с ID ${params.channelId} был успешно изменен`,
                        theme: 'success',
                    });

                    void dataManager.invalidateSource(getChannelSource);
                    void router.navigate({
                        to: `/channels/${params.channelId}`,
                    });
                })
                .catch(handleError);
        },
        [dataManager, handleError, params.channelId, router],
    );

    return (
        <Page title="Редактировать канал">
            <DataLoader
                error={channelQuery.error}
                status={channelQuery.status}
                errorAction={channelQuery.refetch}
            >
                {channel && (
                    <EditForm
                        initialValues={{
                            name: channel.name,
                            type: [channel.type],
                            params: '{}',
                        }}
                        onSubmit={handleSubmit}
                    />
                )}
            </DataLoader>
        </Page>
    );
};

export const Route = createFileRoute('/channels/$channelId/edit')(
    WithAuth({
        component: Edit,
        loader: () => {
            return {
                crumb: 'Редактировать канал',
            };
        },
    }),
);
