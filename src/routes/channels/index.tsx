import { useCallback, useState, useMemo } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import {
    Table,
    withTableActions,
    withTableCopy,
    withTableSorting,
    Icon,
    Flex,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { TABLE_ACTION_SIZE } from '~/constants/common';
import { listChannelsSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Channel, ChannelType } from '~/services/api/notification';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { DeleteChannel } from './-components/DeleteChannel';
import { Filters } from './-components/Filters';

import type { TableActionConfig, TableColumnConfig } from '@gravity-ui/uikit';

export const Route = createFileRoute('/channels/')(
    WithAuth({
        component: RouteComponent,
    }),
);

const ChannelsTable = withTableActions(
    withTableCopy(withTableSorting<Channel>(Table)),
);

const columns: TableColumnConfig<Channel>[] = [
    {
        id: 'name',
        name: 'Название',
        template: ({ name }: Channel) => name,
        primary: true,
        meta: {
            copy: ({ name }: Channel) => name,
        },
    },
    {
        id: 'id',
        name: 'ID',
        template: ({ id }: Channel) => <Id id={id} />,
        meta: {
            copy: ({ id }: Channel) => id,
        },
    },
    {
        id: 'type',
        name: 'Тип',
        template: ({ type }: Channel) => type,
        meta: {
            copy: ({ type }: Channel) => type,
        },
    },
];

function RouteComponent() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<ChannelType[]>([]);
    const [deleteChannel, setDeleteChannel] = useState<Channel | null>(null);

    const channelsQuery = useQueryData(listChannelsSource, {});

    const filteredData = useMemo(() => {
        return (
            channelsQuery.data?.filter((channel) => {
                const matchesSearch =
                    channel.name.toLowerCase().includes(search.toLowerCase()) ||
                    channel.id.toLowerCase().includes(search.toLowerCase());

                const matchesType =
                    typeFilter.length === 0 ||
                    typeFilter.includes(channel.type);

                return matchesSearch && matchesType;
            }) ?? []
        );
    }, [channelsQuery.data, search, typeFilter]);

    const onRowClick = useCallback(
        (item: Channel) => {
            void router.navigate({
                to: `/channels/${item.id}`,
            });
        },
        [router],
    );

    const getRowActions = useCallback(
        (item: Channel) => {
            const items: TableActionConfig<Channel>[] = [
                {
                    text: 'Редактировать',
                    icon: <Icon data={Pencil} size={TABLE_ACTION_SIZE} />,
                    handler: () => {
                        void router.navigate({
                            to: `/channels/$channelId/edit`,
                            params: {
                                channelId: item.id,
                            },
                        });
                    },
                },
                {
                    text: 'Удалить',
                    icon: <Icon data={TrashBin} size={TABLE_ACTION_SIZE} />,
                    theme: 'danger',
                    handler: () => {
                        setDeleteChannel(item);
                    },
                },
            ];

            return items;
        },
        [router],
    );

    const onChannelsDelete = useCallback(() => {
        toaster.add({
            name: 'channel-deleted',
            title: 'Канал удален',
            content: `Канал с ID ${deleteChannel?.id} был успешно удален`,
            theme: 'success',
        });

        setDeleteChannel(null);
    }, [deleteChannel?.id]);

    const primaryActions = useMemo(
        () => [
            {
                label: 'Создать канал',
                onClick: () => {
                    void router.navigate({
                        to: '/channels/create',
                    });
                },
            },
        ],
        [router],
    );

    return (
        <Page title="Каналы оповещения" primaryActions={primaryActions}>
            <DataLoader
                status={channelsQuery.status}
                error={channelsQuery.error}
                errorAction={channelsQuery.refetch}
            >
                <Flex direction="column" gap={2}>
                    <Filters
                        search={search}
                        onSearchChange={setSearch}
                        selectedTypes={typeFilter}
                        onTypesChange={setTypeFilter}
                    />
                    <ChannelsTable
                        data={filteredData}
                        columns={columns}
                        onRowClick={onRowClick}
                        getRowActions={getRowActions}
                    />
                </Flex>
                <DeleteChannel
                    open={!!deleteChannel}
                    onClose={() => setDeleteChannel(null)}
                    onSuccess={onChannelsDelete}
                    deleteChannel={deleteChannel}
                />
            </DataLoader>
        </Page>
    );
}
