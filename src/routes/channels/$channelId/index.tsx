import { useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import { DefinitionList, Flex, Label } from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { ChannelTemplate } from '~/components/ChannelTemplate';
import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { getChannelSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Channel } from '~/services/api/notification';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { DeleteChannel } from '../-components/DeleteChannel';

export const Route = createFileRoute('/channels/$channelId/')(
    WithAuth({
        component: RouteComponent,
    }),
);

function RouteComponent() {
    const router = useRouter();
    const { channelId } = Route.useParams();

    const channelQuery = useQueryData(getChannelSource, {
        id: channelId,
    });

    const [deleteChannel, setDeleteChannel] = useState<Channel | null>(null);

    const primaryActions = useMemo(
        () => [
            {
                text: 'Редактировать канал',
                icon: Pencil,
                onClick: () => {
                    void router.navigate({
                        to: '/channels/$channelId/edit',
                        params: { channelId },
                    });
                },
            },
        ],
        [router, channelId],
    );

    const onChannelDelete = useCallback(() => {
        toaster.add({
            name: 'channel-deleted',
            title: 'Канал удален',
            content: `Канал с ID ${deleteChannel?.id} был успешно удален`,
            theme: 'success',
        });

        void router.navigate({
            to: '/channels',
        });
    }, [router, deleteChannel?.id]);

    const secondaryActions = useMemo(
        () => [
            {
                text: 'Удалить',
                icon: TrashBin,
                theme: 'danger' as const,
                onClick: () => {
                    if (!channelQuery.data) {
                        return;
                    }

                    setDeleteChannel(channelQuery.data);
                },
            },
        ],
        [channelQuery.data],
    );

    const params = useMemo(() => {
        if (!channelQuery.data) {
            return null;
        }

        const data = JSON.parse(channelQuery.data.params ?? '{}') as {
            chat_id?: string[] | string;
            email?: string[] | string;
        };

        return (Array.isArray(data.chat_id) ? data.chat_id : [data.chat_id])
            .concat(Array.isArray(data.email) ? data.email : [data.email])
            .map((item) => (
                <Label
                    copyText={item}
                    key={item}
                    copyButtonLabel="Скопировать"
                    type="copy"
                >
                    {item}
                </Label>
            ));
    }, [channelQuery.data]);

    return (
        <Page
            title="Канал оповещения"
            primaryActions={primaryActions}
            secondaryActions={secondaryActions}
        >
            <DataLoader
                status={channelQuery.status}
                error={channelQuery.error}
                errorAction={channelQuery.refetch}
            >
                <DefinitionList>
                    <DefinitionList.Item
                        name="ID"
                        copyText={channelQuery.data?.id}
                    >
                        <Id id={channelQuery.data?.id ?? ''} />
                    </DefinitionList.Item>
                    <DefinitionList.Item
                        name="Название"
                        copyText={channelQuery.data?.name}
                    >
                        {channelQuery.data?.name}
                    </DefinitionList.Item>
                    <DefinitionList.Item name="Тип">
                        <ChannelTemplate channel={channelQuery.data} />
                    </DefinitionList.Item>
                    <DefinitionList.Item name="Параметры">
                        <Flex gap={2} wrap="wrap" alignItems="center">
                            {params}
                        </Flex>
                    </DefinitionList.Item>
                </DefinitionList>

                <DeleteChannel
                    open={!!deleteChannel}
                    onClose={() => setDeleteChannel(null)}
                    onSuccess={onChannelDelete}
                    deleteChannel={deleteChannel}
                />
            </DataLoader>
        </Page>
    );
}
