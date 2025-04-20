import { useMemo } from 'react';

import { Feature } from '@gravity-ui/illustrations';
import { PlaceholderContainer } from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useAuth } from '~/hooks/useAuth';
import { LoaderContainer } from '~/services/data-source/components/LoaderContainer';
import { t } from '~/services/i18n';

import type { PlaceholderContainerActionProps } from '@gravity-ui/uikit';

const Content = () => {
    const router = useRouter();
    const auth = useAuth(router);

    const actions = useMemo(() => {
        const actions: PlaceholderContainerActionProps[] = [
            auth.status == 'UNAUTHENTICATED'
                ? {
                      text: t('auth.login'),
                      onClick: () => {
                          auth.login();
                      },
                  }
                : {
                      text: t('resources.create'),
                      onClick: () => {
                          void router.navigate({
                              to: '/resources/create',
                          });
                      },
                  },
        ];

        return actions;
    }, [auth, router]);

    if (auth.status === 'PENDING') {
        return <LoaderContainer />;
    }

    return (
        <PlaceholderContainer
            image={<Feature />}
            title={t('welcome')}
            description={t('description')}
            actions={actions}
        />
    );
};
export const Index = () => {
    return (
        <Page title={t('crumb.index')}>
            <Content />
        </Page>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
    loader: () => {
        return {
            crumb: t('crumb.index'),
        };
    },
});
