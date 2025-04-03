import { Fragment, useCallback, useMemo, useState } from 'react';

import { DelayedTextInput } from '@gravity-ui/components';
import { useQueryData } from '@gravity-ui/data-source';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import { Database } from '@gravity-ui/illustrations';
import {
    Flex,
    Icon,
    Link,
    PlaceholderContainer,
    Table,
    Text,
    withTableActions,
    withTableCopy,
    withTableSorting,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { EMPTY_DASH, TABLE_ACTION_SIZE } from '~/constants/common';
import { listResources } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import type { Resource } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { DeleteDialog } from './-components/DeleteDialog';

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
        template: ({ name }: Resource) => <Text>{name}</Text>,
        meta: {
            sort: true,
        },
    },
    {
        id: 'description',
        name: 'Описание',
        template: ({ description }: Resource) => (
            <Text>{description || EMPTY_DASH}</Text>
        ),
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
        id: 'keywords',
        name: 'Ключевые слова',
        template: ({ keywords }: Resource) => (
            <Text>
                {keywords.length > 0 ? keywords.join(', ') : EMPTY_DASH}
            </Text>
        ),
    },

    {
        id: 'interval',
        name: 'Интервал',
        template: ({ interval }: Resource) => <Text>{interval}</Text>,
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
                return (
                    resource.name.includes(search) ||
                    resource.url.includes(search)
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

    return (
        <Page
            title="Ресурсы"
            primaryActions={[
                {
                    label: 'Создать ресурс',
                    onClick: () => {
                        void router.navigate({
                            to: '/resources/create',
                        });
                    },
                },
            ]}
        >
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
                            <DelayedTextInput
                                onUpdate={setSearch}
                                value={search}
                                placeholder="Фильтр по URL или названию"
                                style={{ width: '300px' }}
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
                                    content: deleteResource?.id,
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
