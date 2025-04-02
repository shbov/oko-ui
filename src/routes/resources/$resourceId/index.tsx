import { useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import { NotFound } from '@gravity-ui/illustrations';
import {
    Table,
    withTableActions,
    Text,
    withTableCopy,
    withTableSorting,
    PlaceholderContainer,
    DefinitionList,
    spacing,
    Label,
    Link as LinkUI,
    Flex,
} from '@gravity-ui/uikit';
import {
    createFileRoute,
    Link,
    useNavigate,
    useRouter,
} from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { EMPTY_DASH } from '~/constants/common';
import { getResource, listEventsSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import type { Event } from '~/services/api/event';
import type { Resource } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { DeleteDialog } from '../-components/DeleteDialog';

import type { TableColumnConfig } from '@gravity-ui/uikit';

const columns: TableColumnConfig<Event>[] = [
    {
        id: 'id',
        name: 'ID',
        template: ({ id }) => <Text>{id}</Text>,
        meta: {
            copy: ({ id }: Event) => id,
            sort: true,
        },
    },
    {
        id: 'date',
        name: 'Дата события',
        template: ({ date }) => <Text>{date.toLocaleString('ru')}</Text>,
        meta: {
            sort: true,
        },
    },
];

const EventsTable = withTableSorting(
    withTableCopy(withTableActions<Event>(Table)),
);

function RouteComponent() {
    const { resourceId } = Route.useParams();
    const navigate = useNavigate();
    const router = useRouter();

    const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

    const { data: resource, ...resourceQuery } = useQueryData(getResource, {
        id: resourceId,
    });

    const { data: events, ...eventsQuery } = useQueryData(listEventsSource, {
        resourceId,
    });

    const onRowClick = useCallback(
        (event: Event) => {
            void navigate({
                to: `/resources/${resourceId}/events/${event.id}`,
            });
        },
        [navigate, resourceId],
    );

    const items = useMemo(() => {
        if (!resource || !resource.resource) {
            return [];
        }

        const {
            enabled,
            start_date,
            description,
            url,
            channels,
            keywords,
            interval,
        } = resource.resource;
        return [
            {
                name: 'ID',
                value: resource?.resource?.id,
                copyText: resource?.resource?.id,
            },
            {
                name: 'Активен',
                value:
                    enabled && start_date && start_date >= new Date()
                        ? 'Да'
                        : 'Нет', // TODO: validate here.
            },
            { name: 'Описание', value: description || null },
            {
                name: 'URL',
                value: (
                    <LinkUI href={url} target="_blank">
                        {url}
                    </LinkUI>
                ),
                copyText: url,
            },
            {
                name: 'Каналы',
                value:
                    channels?.length > 0 ? (
                        <Flex gap={2}>
                            {channels?.map((channel) => (
                                <Link
                                    key={channel.id}
                                    to={`/channels/$channelId`}
                                    params={{ channelId: channel.id }}
                                    target="_blank"
                                >
                                    {channel.name}
                                </Link>
                            ))}
                        </Flex>
                    ) : null,
            },
            {
                name: 'Ключевые слова',
                value: (
                    <Flex gap={2}>
                        {keywords.map((word) => (
                            <Label
                                key={word}
                                type="copy"
                                copyText={word}
                                copyButtonLabel="Скопировать"
                            >
                                {word}
                            </Label>
                        ))}
                    </Flex>
                ),
            },
            { name: 'Интервал', value: interval },
        ];
    }, [resource]);

    return (
        <Page
            title={resource?.resource?.name ?? ''}
            isLoading={resourceQuery.isLoading}
            primaryActions={[
                {
                    label: 'Редактировать',
                    icon: Pencil,
                    onClick: () => {
                        void router.navigate({
                            to: '/resources/$resourceId/edit',
                            params: { resourceId },
                        });
                    },
                },
            ]}
            secondaryActions={[
                {
                    label: 'События',
                    onClick: () => {
                        void router.navigate({
                            to: '/resources/$resourceId/events',
                            params: { resourceId },
                        });
                    },
                },
                {
                    label: 'Снапшоты',
                    onClick: () => {
                        void router.navigate({
                            to: '/resources/$resourceId/snapshots',
                            params: { resourceId },
                        });
                    },
                },
                {
                    label: 'Удалить',
                    theme: 'danger',
                    icon: TrashBin,
                    onClick: () => {
                        if (resource?.resource) {
                            setDeleteResource(resource.resource);
                        }
                    },
                },
            ]}
        >
            <DataLoader
                error={resourceQuery.error}
                status={resourceQuery.status}
                errorAction={resourceQuery.refetch}
            >
                <div className={spacing({ mb: 5 })}>
                    <DefinitionList>
                        {items.map((item) => (
                            <DefinitionList.Item
                                key={item.name}
                                name={item.name}
                                copyText={item.copyText}
                            >
                                {item.value}
                            </DefinitionList.Item>
                        ))}
                    </DefinitionList>
                </div>

                <Text variant="subheader-2">Все события</Text>
                <DataLoader
                    error={eventsQuery.error}
                    status={eventsQuery.status}
                    errorAction={eventsQuery.refetch}
                >
                    {events?.length && events.length > 0 ? (
                        <EventsTable
                            data={events ?? []}
                            columns={columns}
                            onRowClick={onRowClick}
                        />
                    ) : (
                        <PlaceholderContainer
                            image={<NotFound />}
                            title="Событий нет"
                            size="m"
                            description="События появятся после проверки ресурса"
                        />
                    )}
                </DataLoader>
            </DataLoader>

            <DeleteDialog
                open={Boolean(deleteResource)}
                onClose={() => setDeleteResource(null)}
                onSuccess={() => {
                    void router.navigate({
                        to: '/resources',
                    });

                    toaster.add({
                        name: 'resource-deleted',
                        title: 'Ресурс удален',
                        content: deleteResource?.id,
                        theme: 'success',
                    });

                    setDeleteResource(null);
                }}
                deleteResource={deleteResource}
            />
        </Page>
    );
}

export const Route = createFileRoute('/resources/$resourceId/')(
    WithAuth({
        component: RouteComponent,
        loader: async ({ params }) => {
            const { resourceId } = params;
            const resource = await api.resource.get({ id: resourceId });

            return {
                crumb: resource.resource.name ?? EMPTY_DASH,
            };
        },
    }),
);
