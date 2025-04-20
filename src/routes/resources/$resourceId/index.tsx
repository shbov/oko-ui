import { useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import {
    Camera,
    ClockArrowRotateLeft,
    Pause,
    Pencil,
    Play,
} from '@gravity-ui/icons';
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

import type { SecondaryPageAction } from '~/components/AppLayout/PageActionsContext';
import { Id } from '~/components/Id';
import { Page } from '~/components/Page';
import { UILink } from '~/components/UILink';
import { PROJECT_FORMAT } from '~/constants/common';
import {
    getResource,
    listChannelsSource,
    listEventsSource,
    listResources,
} from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import type { Event } from '~/services/api/event';
import type { Resource } from '~/services/api/resource';
import { DataLoader, dataManager } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import { DeleteDialog } from '../-components/DeleteDialog';
import { ResourceStatus } from '../-components/ResourceStatus';
import { eventColumns } from './events/-components/templates';

const EventsTable = withTableSorting(
    withTableCopy(withTableActions<Event>(Table)),
);

function RouteComponent() {
    const { resourceId } = Route.useParams();
    const navigate = useNavigate();
    const handleError = useApiError();
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
            starts_from,
            description,
            url,
            channels,
            keywords,
            interval,
        } = resource.resource;

        const date = dateTimeParse(starts_from);

        return [
            {
                name: t('resources.id'),
                value: <Id id={resource?.resource?.id ?? ''} />,
                copyText: resource?.resource?.id,
            },
            {
                name: t('resources.startDate'),
                value: date?.format(PROJECT_FORMAT) ?? null,
            },
            {
                name: t('resources.status'),
                value: <ResourceStatus enabled={enabled} startDate={date} />,
            },
            {
                name: t('resources.description'),
                value: description || null,
            },
            {
                name: t('resources.url'),
                value: (
                    <LinkUI href={url} target="_blank">
                        {url}
                    </LinkUI>
                ),
                copyText: url,
            },
            {
                name: t('resources.channels'),
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
                name: t('resources.keywords'),
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
            { name: t('resources.interval'), value: interval },
        ];
    }, [resource, allChannels]);

    const primaryActions = useMemo(
        () => [
            {
                text: t('resources.edit'),
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

    const secondaryActions: SecondaryPageAction[] = useMemo(
        () => [
            {
                text: t('resources.snapshots'),
                icon: Camera,
                onClick: () => {
                    void router.navigate({
                        to: '/resources/$resourceId/snapshots',
                        params: { resourceId },
                    });
                },
            },
            {
                text: t('resources.events'),
                icon: ClockArrowRotateLeft,
                onClick: () => {
                    void router.navigate({
                        to: '/resources/$resourceId/events',
                        params: { resourceId },
                    });
                },
            },
            {
                text: resource?.resource?.enabled
                    ? t('resources.pause')
                    : t('resources.resume'),
                icon: resource?.resource?.enabled ? Pause : Play,
                onClick: () => {
                    api.resource
                        .edit({
                            id: resourceId,
                            enabled: !resource?.resource?.enabled,
                        })
                        .then(() => {
                            void dataManager.invalidateSource(listResources);
                            void dataManager.invalidateSource(getResource);

                            toaster.add({
                                name: 'resource-updated',
                                title: resource?.resource?.enabled
                                    ? t('resources.paused')
                                    : t('resources.resumed'),
                                theme: 'success',
                            });
                        })
                        .catch(handleError);
                },
            },
            // {
            //     text: 'Удалить',
            //     theme: 'danger' as const,
            //     icon: TrashBin,
            //     onClick: () => {
            //         if (resource?.resource) {
            //             setDeleteResource(resource.resource);
            //         }
            //     },
            // },
        ],
        [resource?.resource, handleError, resourceId, router],
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

                <Text variant="subheader-2">
                    {t('resources.lastEvents')}
                </Text>
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
                            title={t('resources.noEvents')}
                            size="m"
                            description={t(
                                'resources.noEventsDescription',
                            )}
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
                        title: t('resources.deleted'),
                        content: t('resources.deletedContent', {
                            id: deleteResource?.id,
                        }),
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
