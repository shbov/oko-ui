import { Fragment, useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import { Database } from '@gravity-ui/illustrations';
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
import { listResources } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Resource } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';
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
        name: 'Название',
        template: ({ name }: Resource) => name,
        primary: true,
        meta: {
            sort: true,
        },
    },
    {
        id: 'description',
        name: 'Описание',
        template: ({ description }: Resource) => description || EMPTY_DASH,
    },
    {
        id: 'url',
        name: 'URL',
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
        name: 'Интервал',
        template: ({ interval }: Resource) => interval,
    },
    {
        id: 'startDate',
        name: 'Дата начала мониторинга',
        template: ({ starts_from }: Resource) =>
            dateTimeParse(starts_from)?.format(PROJECT_FORMAT) ?? EMPTY_DASH,
    },
    {
        id: 'status',
        name: 'Статус',
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

    const resourcesQuery = useQueryData(listResources, {});

    const getRowActions = useCallback(
        (resource: Resource) => {
            const actions: TableActionConfig<Resource>[] = [
                {
                    text: 'Редактировать',
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
                    text: 'Удалить',
                    handler: () => {
                        setDeleteResource(resource);
                    },
                    theme: 'danger',
                    icon: <Icon data={TrashBin} size={TABLE_ACTION_SIZE} />,
                },
            ];

            return actions;
        },
        [router, setDeleteResource],
    );

    const actions = useMemo(() => {
        const actions: PlaceholderContainerActionProps[] = [
            {
                text: 'Создать ресурс',
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
                text: 'Создать ресурс',
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
        <Page title="Ресурсы" primaryActions={primaryActions}>
            <DataLoader
                status={resourcesQuery.status}
                error={resourcesQuery.error}
                errorAction={resourcesQuery.refetch}
            >
                {resourcesQuery.data?.resources.length === 0 ? (
                    <PlaceholderContainer
                        image={<Database />}
                        title="Ресурсов еще нет"
                        description="Создайте ваш первый ресурс!"
                        actions={actions}
                    />
                ) : (
                    <Fragment>
                        <Flex direction="column" gap={2}>
                            <Filters
                                search={search}
                                onSearchChange={setSearch}
                            />
                            <ResourcesTable
                                data={filteredData}
                                columns={columns}
                                getRowActions={getRowActions}
                                onRowClick={onRowClick}
                            />
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
                                    title: 'Ресурс удален',
                                    content: `Ресурс с ID ${deleteResource?.id} был успешно удален`,
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
