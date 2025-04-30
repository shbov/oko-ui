import { useCallback, useEffect, useState } from 'react';

import { useDataManager, useQueryData } from '@gravity-ui/data-source';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { getChannelSource, listChannelsSource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { EditFormValues } from '~/routes/channels/-components/constants';
import { api } from '~/services/api';
import { ChannelType } from '~/services/api/notification';
import { DataLoader } from '~/services/data-source/components/DataLoader';
import { t } from '~/services/i18n';
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
                        title: t('channels.edited'),
                        content: t('channels.editedContent', {
                            id: params.channelId,
                        }),
                        theme: 'success',
                    });

                    void dataManager.invalidateSource(getChannelSource);
                    void dataManager.invalidateSource(listChannelsSource);
                    void router.navigate({
                        to: `/channels/${params.channelId}`,
                    });
                })
                .catch(handleError);
        },
        [dataManager, handleError, params.channelId, router],
    );

    const [initialValues, setInitialValues] = useState<EditFormValues | null>(
        null,
    );

    useEffect(() => {
        if (!initialValues && channel) {
            const data = JSON.parse(channel.params ?? '{}') as {
                chat_id?: string[];
                email?: string[];
            };

            const value = [
                Array.isArray(data.chat_id) ? data.chat_id : [data.chat_id],
                Array.isArray(data.email) ? data.email : [data.email],
            ]
                .flat()
                .filter(Boolean);

            setInitialValues({
                name: channel.name,
                ...(channel.type === ChannelType.Telegram
                    ? {
                          chatId: value.join(', ') ?? '',
                          type: ChannelType.Telegram,
                      }
                    : {
                          email: value.join(', ') ?? '',
                          type: ChannelType.Email,
                      }),
            });
        }
    }, [initialValues, channel]);

    return (
        <Page title={t('channels.edit')}>
            <DataLoader
                error={channelQuery.error}
                status={channelQuery.status}
                errorAction={channelQuery.refetch}
            >
                {initialValues && (
                    <EditForm
                        initialValues={initialValues}
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
                crumb: t('channels.edit'),
            };
        },
    }),
);
