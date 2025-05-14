import { Fragment, useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Pause, Pencil, Play } from '@gravity-ui/icons';
import { Database, NotFound } from '@gravity-ui/illustrations';
import {
    Flex,
    Icon,
    Link,
    PlaceholderContainer,
    Table,
    withTableActions,
    withTableCopy,
    withTableSorting,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import {
    EMPTY_DASH,
    PROJECT_FORMAT,
    TABLE_ACTION_SIZE,
} from '~/constants/common';
import { getResource, listResources } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { api } from '~/services/api';
import type { Resource } from '~/services/api/resource';
import { DataLoader, dataManager } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import { DeleteDialog } from './-components/DeleteDialog';
import { Filters } from './-components/Filters';
import { ResourceStatus } from './-components/ResourceStatus';

import type {
    PlaceholderContainerActionProps,
    TableActionConfig,
    TableColumnConfig,
} from '@gravity-ui/uikit';

const ResourcesTable = withTableSorting(
    withTableCopy(withTableActions<Resource>(Table)),
);

const columns: TableColumnConfig<Resource>[] = [
    {
        id: 'name',
        name: t('resources.name'),
        template: ({ name }: Resource) => name,
        primary: true,
        meta: {
            sort: true,
        },
    },
    {
        id: 'description',
        name: t('resources.description'),
        template: ({ description }: Resource) => description || EMPTY_DASH,
    },
    {
        id: 'url',
        name: t('resources.url'),
        template: ({ url }: Resource) => (
            <Link
                href={url}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
            >
                {url}
            </Link>
        ),
        meta: {
            copy: ({ url }: Resource) => url,
            sort: true,
        },
    },
    {
        id: 'interval',
        name: t('resources.interval'),
        template: ({ interval }: Resource) => interval,
    },
    {
        id: 'startDate',
        name: t('resources.startDate'),
        template: ({ starts_from }: Resource) =>
            dateTimeParse(starts_from)?.format(PROJECT_FORMAT) ?? EMPTY_DASH,
    },
    {
        id: 'status',
        name: t('resources.statusName'),
        template: ({ enabled, starts_from }: Resource) => (
            <ResourceStatus
                enabled={enabled}
                startDate={dateTimeParse(starts_from)}
            />
        ),
    },
];

function RouteComponent() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [deleteResource, setDeleteResource] = useState<Resource | null>(null);
    const handleError = useApiError();

    const resourcesQuery = useQueryData(listResources, {});

    const getRowActions = useCallback(
        (resource: Resource) => {
            const actions: TableActionConfig<Resource>[] = [
                {
                    text: t('resources.edit'),
                    handler: () => {
                        void router.navigate({
                            to: '/resources/$resourceId/edit',
                            params: {
                                resourceId: resource.id,
                            },
                        });
                    },
                    icon: <Icon data={Pencil} size={TABLE_ACTION_SIZE} />,
                },
                {
                    text: resource.enabled
                        ? t('resources.pause')
                        : t('resources.resume'),
                    icon: (
                        <Icon
                            data={resource.enabled ? Pause : Play}
                            size={TABLE_ACTION_SIZE}
                        />
                    ),
                    handler: () => {
                        void api.resource
                            .edit({
                                id: resource.id,
                                enabled: !resource.enabled,
                            })
                            .then(() => {
                                void dataManager.invalidateSource(
                                    listResources,
                                );
                                void dataManager.invalidateSource(getResource);

                                toaster.add({
                                    name: 'resource-updated',
                                    title: resource.enabled
                                        ? t('resources.paused')
                                        : t('resources.resumed'),
                                    theme: 'success',
                                });
                            })
                            .catch(handleError);
                    },
                },
            ];

            return actions;
        },
        [router, handleError],
    );

    const actions = useMemo(() => {
        const actions: PlaceholderContainerActionProps[] = [
            {
                text: t('resources.create'),
                onClick: () => {
                    void router.navigate({
                        to: '/resources/create',
                    });
                },
            },
        ];

        return actions;
    }, [router]);

    const filteredData = useMemo(() => {
        return (
            resourcesQuery.data?.resources.filter((resource) => {
                const searchLower = search?.toLowerCase().trim();
                const nameLower = resource.name?.toLowerCase().trim();
                const urlLower = resource.url?.toLowerCase().trim();

                return (
                    nameLower?.includes(searchLower) ||
                    urlLower?.includes(searchLower)
                );
            }) ?? []
        );
    }, [resourcesQuery.data, search]);

    const onRowClick = useCallback(
        (resource: Resource) => {
            void router.navigate({
                to: '/resources/$resourceId',
                params: {
                    resourceId: resource.id,
                },
            });
        },
        [router],
    );

    const primaryActions = useMemo(
        () => [
            {
                text: t('resources.create'),
                onClick: () => {
                    void router.navigate({
                        to: '/resources/create',
                    });
                },
            },
        ],
        [router],
    );

    return (
        <Page title={t('resources.title')} primaryActions={primaryActions}>
            <DataLoader
                status={resourcesQuery.status}
                error={resourcesQuery.error}
                errorAction={resourcesQuery.refetch}
            >
                {resourcesQuery.data?.resources.length === 0 ? (
                    <PlaceholderContainer
                        image={<Database />}
                        title={t('resources.noResources')}
                        description={t('resources.createResource')}
                        actions={actions}
                    />
                ) : (
                    <Fragment>
                        <Flex direction="column" gap={2}>
                            <Filters
                                search={search}
                                onSearchChange={setSearch}
                            />

                            {filteredData.length > 0 ? (
                                <ResourcesTable
                                    data={filteredData}
                                    columns={columns}
                                    getRowActions={getRowActions}
                                    onRowClick={onRowClick}
                                />
                            ) : (
                                <PlaceholderContainer
                                    title={t('resources.emptySearchTitle')}
                                    description={t(
                                        'resources.emptySearchTitleDescription',
                                    )}
                                    image={<NotFound />}
                                />
                            )}
                        </Flex>

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
                    </Fragment>
                )}
            </DataLoader>
        </Page>
    );
}

export const Route = createFileRoute('/resources/')(
    WithAuth({
        component: RouteComponent,
    }),
);
