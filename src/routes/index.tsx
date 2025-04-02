import { useMemo } from 'react';

import { Feature } from '@gravity-ui/illustrations';
import { PlaceholderContainer } from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useAuth } from '~/hooks/useAuth';
import { LoaderContainer } from '~/services/data-source/components/LoaderContainer';

import type { PlaceholderContainerActionProps } from '@gravity-ui/uikit';

const Content = () => {
    const router = useRouter();
    const auth = useAuth(router);

    const actions = useMemo(() => {
        const actions: PlaceholderContainerActionProps[] = [
            auth.status == 'UNAUTHENTICATED'
                ? {
                      text: 'Войти в аккаунт',
                      onClick: () => {
                          auth.login();
                      },
                  }
                : {
                      text: 'Создать ресурс',
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
            title="Добро пожаловать в OKO"
            description={
                <div>
                    Oko UI - сервис для автоматического отслеживания изменений
                    на веб-страницах.
                    <br />
                    <br />
                    Позволяет настраивать мониторинг по ключевым словам,
                    выбранным областям страницы и получать уведомления об
                    изменениях
                </div>
            }
            actions={actions}
        />
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
