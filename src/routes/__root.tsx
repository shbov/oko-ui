import type { RefObject } from 'react';
import { useCallback, useMemo, useState } from 'react';

import {
    House,
    FaceRobot,
    Plus,
    Person,
    PersonXmark,
    Persons,
    Database,
} from '@gravity-ui/icons';
import { AsideHeader, FooterItem } from '@gravity-ui/navigation';
import { Flex, Icon, List } from '@gravity-ui/uikit';
import {
    createRootRouteWithContext,
    useMatches,
    useNavigate,
    useRouter,
} from '@tanstack/react-router';
import block from 'bem-cn-lite';

import { AppLayout } from '~/components/AppLayout';
import { NotFound } from '~/components/NotFound';
import { useAuth } from '~/hooks/useAuth';
import type { FileRouteTypes, FileRoutesByFullPath } from '~/routeTree.gen';
import type { RouterContext } from '~/services/router/types';

import './root.scss';

import type { MenuItem } from '@gravity-ui/navigation';

const b = block('navigation');

type Item = {
    id: string;
    title: string;
    icon: typeof House;
    current?: boolean;
    to: FileRouteTypes['to'];
    path: keyof FileRoutesByFullPath;
};

const App = () => {
    const [compact, setCompact] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);

    const navigate = useNavigate();
    const router = useRouter();
    const matches = useMatches();
    const auth = useAuth(router);

    const menuItems: MenuItem[] = useMemo(() => {
        const currentRoute = matches.slice(-1)[0];

        const items: Item[] = [
            {
                id: 'id',
                title: 'Главная',
                icon: House,
                current: true,
                path: '/' as const,
                to: '/' as const,
            },
            ...(auth.user
                ? [
                      {
                          id: 'resources',
                          title: 'Ресурсы',
                          icon: Database,
                          path: '/resources' as const,
                          to: '/resources' as const,
                      },
                      {
                          id: 'create-resources',
                          title: 'Создать ресурс',
                          icon: Plus,
                          path: '/resources/create' as const,
                          to: '/resources/create' as const,
                      },
                  ]
                : []),
        ];

        return items.map((item) => {
            return {
                ...item,
                current: currentRoute.fullPath === item.path,
                onItemClick: () => {
                    void navigate({
                        to: item.to,
                    });
                },
            };
        });
    }, [auth.user, matches, navigate]);

    const renderFooter = useCallback(
        ({ asideRef }: { asideRef: RefObject<HTMLDivElement> }) => {
            const items = [
                ...(auth.user
                    ? [
                          {
                              title: 'Управление пользователями',
                              icon: Persons,
                              onClick: () => {
                                  window.open(
                                      'https://hse.ru/staff/users/list',
                                      '_blank',
                                  );
                              },
                          },
                          {
                              title: 'Выйти из аккаунта',
                              icon: PersonXmark,
                              onClick: () => {
                                  auth.logout();
                              },
                          },
                      ]
                    : [
                          {
                              title: 'Войти в аккаунт',
                              icon: Person,
                              onClick: () => {
                                  auth.login();
                              },
                          },
                      ]),
            ];

            return (
                <FooterItem
                    item={{
                        id: 'user',
                        icon: Person,
                        title: 'Учетная запись',
                        tooltipText: 'Учетная запись',
                        current: popupVisible,
                        onItemClick: () => {
                            setPopupVisible(!popupVisible);
                        },
                    }}
                    popupVisible={popupVisible}
                    popupAnchor={asideRef}
                    onClosePopup={() => setPopupVisible(false)}
                    popupKeepMounted={true}
                    renderPopupContent={() => {
                        return (
                            <List
                                filterable={false}
                                virtualized={false}
                                items={items}
                                onItemClick={(item) => item.onClick()}
                                itemHeight={() => 36}
                                itemClassName={b('item')}
                                renderItem={(item) => {
                                    return (
                                        <Flex gap={2}>
                                            <Icon data={item.icon} />
                                            {item.title}
                                        </Flex>
                                    );
                                }}
                            />
                        );
                    }}
                    compact={compact}
                />
            );
        },
        [auth, compact, popupVisible],
    );

    return (
        <AsideHeader
            compact={compact}
            renderContent={() => <AppLayout />}
            onChangeCompact={setCompact}
            multipleTooltip
            menuItems={menuItems}
            logo={{
                text: OKO.title,
                icon: FaceRobot,
                onClick: () => {
                    void navigate({
                        to: '/',
                    });
                },
            }}
            renderFooter={renderFooter}
        />
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: App,
    notFoundComponent: NotFound,
    loader: () => {
        return {
            crumb: OKO.title,
        };
    },
});
