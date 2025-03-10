import { useCallback, useMemo, useState } from 'react';

import { DelayedTextInput } from '@gravity-ui/components';
import { idle, useQueryData } from '@gravity-ui/data-source';
import { Database } from '@gravity-ui/illustrations';
import {
    Flex,
    Link,
    PlaceholderContainer,
    Table,
    Text,
    withTableActions,
    withTableCopy,
    withTableSorting,
} from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { api } from '~/api';
import type { Resource } from '~/api/resource';
import { Page } from '~/components/Page';
import { listResources } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { useAuth } from '~/hooks/useAuth';
import { DataLoader } from '~/services/data-source';
import { LoaderContainer } from '~/services/data-source/components/LoaderContainer';
import { toaster } from '~/services/toaster';

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
        template: ({ description }: Resource) => <Text>{description}</Text>,
    },
    {
        id: 'url',
        name: 'URL',
        template: ({ url }: Resource) => (
            <Link href={url} target="_blank">
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
            <Text>{keywords.join(', ')}</Text>
        ),
    },

    {
        id: 'interval',
        name: 'Интервал',
        template: ({ interval }: Resource) => <Text>{interval}</Text>,
    },
];

const Content = () => {
    const router = useRouter();
    const auth = useAuth(router);
    const handleError = useApiError();
    const [search, setSearch] = useState('');

    const resourcesQuery = useQueryData(
        listResources,
        auth.status === 'AUTHENTICATED' ? {} : idle,
    );

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
                },
                {
                    text: 'Удалить',
                    handler: () => {
                        api.resource
                            .deleteResource(resource.id)
                            .then(() => {
                                toaster.add({
                                    name: 'resource-deleted',
                                    title: 'Ресурс удален',
                                    content: resource.id,
                                    theme: 'success',
                                });

                                void router.navigate({
                                    to: '/',
                                });
                            })
                            .catch(handleError);
                    },
                    theme: 'danger',
                },
            ];

            return actions;
        },
        [handleError, router],
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

    if (auth.status === 'PENDING') {
        return <LoaderContainer />;
    }

    if (auth.status == 'UNAUTHENTICATED') {
        return <Text variant="code-3">You are not authenticated</Text>;
    }

    return (
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
                    />
                </Flex>
            )}
        </DataLoader>
    );
};
export const Index = () => {
    return (
        <Page title="Главная">
            <Content />
        </Page>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
    staticData: {
        crumb: 'Главная',
    },
});
