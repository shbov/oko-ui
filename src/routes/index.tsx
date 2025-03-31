import { Fragment, useMemo } from 'react';

import { idle, useQueryData } from '@gravity-ui/data-source';
import { Database, Feature } from '@gravity-ui/illustrations';
import { PlaceholderContainer, Text } from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { listResources } from '~/data-sources';
import { useAuth } from '~/hooks/useAuth';
import { DataLoader } from '~/services/data-source';
import { LoaderContainer } from '~/services/data-source/components/LoaderContainer';

import type { PlaceholderContainerActionProps } from '@gravity-ui/uikit';

const Content = () => {
    const router = useRouter();
    const auth = useAuth(router);

    const resourcesQuery = useQueryData(
        listResources,
        auth.status === 'AUTHENTICATED' ? {} : idle,
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
                <Fragment>
                    <PlaceholderContainer
                        image={<Feature />}
                        title="Добро пожаловать в OKO"
                        description="Здесь вы можете добавлять ресурсы и просматривать их события"
                        actions={actions}
                    />
                </Fragment>
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
    loader: () => {
        return {
            crumb: 'Главная',
        };
    },
});
