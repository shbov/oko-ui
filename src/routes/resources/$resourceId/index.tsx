import { useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { Pause, Pencil, Play, TrashBin } from '@gravity-ui/icons';
import { NotFound } from '@gravity-ui/illustrations';
import {
    Text,
    PlaceholderContainer,
    DefinitionList,
    spacing,
    Label,
    Link as LinkUI,
    Flex,
    withTableSorting,
    withTableActions,
    Table,
    withTableCopy,
} from '@gravity-ui/uikit';
import {
    createFileRoute,
    useNavigate,
    useRouter,
} from '@tanstack/react-router';

import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { UILink } from '~/components/UILink';
import {
    getResource,
    listChannelsSource,
    listEventsSource,
} from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Event } from '~/services/api/event';
import type { Resource } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { DeleteDialog } from '../-components/DeleteDialog';
import { eventColumns } from './events/-components/templates';

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

    const { data: allChannels } = useQueryData(listChannelsSource, {
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
                value: <Id id={resource?.resource?.id ?? ''} />,
                copyText: resource?.resource?.id,
            },
            {
                name: 'Активен',
                value:
                    enabled && start_date && start_date >= new Date()
                        ? 'Да'
                        : 'Нет', // TODO: validate here.
            },
            {
                name: 'Дата начала мониторинга',
                value: start_date?.toLocaleDateString('ru-RU') ?? null,
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
                        <Flex gap={2} wrap="wrap">
                            {channels?.map((channel) => (
                                <UILink
                                    key={channel}
                                    to={`/channels/$channelId`}
                                    params={{ channelId: channel }}
                                    target="_blank"
                                >
                                    {
                                        allChannels?.find(
                                            (c) => c.id === channel,
                                        )?.name
                                    }
                                </UILink>
                            ))}
                        </Flex>
                    ) : null,
            },
            {
                name: 'Ключевые слова',
                value: (
                    <Flex gap={2} wrap="wrap">
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
    }, [resource, allChannels]);

    const primaryActions = useMemo(
        () => [
            {
                text: 'Редактировать',
                icon: Pencil,
                onClick: () => {
                    void router.navigate({
                        to: '/resources/$resourceId/edit',
                        params: { resourceId },
                    });
                },
            },
        ],
        [router, resourceId],
    );

    const secondaryActions = useMemo(
        () => [
            {
                text:
                    resource?.resource.status === 'active'
                        ? 'Приостановить'
                        : 'Возобновить',
                icon: resource?.resource.status === 'active' ? Pause : Play,
                onClick: () => {},
            },
            {
                text: 'Удалить',
                theme: 'danger' as const,
                icon: TrashBin,
                onClick: () => {
                    if (resource?.resource) {
                        setDeleteResource(resource.resource);
                    }
                },
            },
        ],
        [resource?.resource, setDeleteResource],
    );

    return (
        <Page
            title={resource?.resource?.name ?? ''}
            isLoading={resourceQuery.isLoading}
            primaryActions={primaryActions}
            secondaryActions={secondaryActions}
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

                <Text variant="subheader-2">Последние события</Text>
                <DataLoader
                    error={eventsQuery.error}
                    status={eventsQuery.status}
                    errorAction={eventsQuery.refetch}
                >
                    {events?.length && events.length > 0 ? (
                        <EventsTable
                            data={events ?? []}
                            columns={eventColumns}
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
                        content: `Ресурс с ID ${deleteResource?.id} был успешно удален`,
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
    }),
);
