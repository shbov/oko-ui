import * as React from 'react';

import { House, FaceRobot, Plus, Person, PersonXmark } from '@gravity-ui/icons';
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
import type { RouterContext } from '~/services/router/types';

import './root.scss';

import type { MenuItem } from '@gravity-ui/navigation';

const b = block('navigation');

const App = () => {
    const [compact, setCompact] = React.useState(true);
    const [popupVisible, setPopupVisible] = React.useState(false);

    const navigate = useNavigate();
    const router = useRouter();
    const matches = useMatches();
    const auth = useAuth(router);

    const menuItems: MenuItem[] = React.useMemo(() => {
        const currentRoute = matches.slice(-1)[0];
        // TODO: add typization on `route`
        const items = [
            {
                id: 'id',
                title: 'Главная',
                icon: House,
                current: true,
                route: '/',
            },
            ...(auth.user
                ? [
                      {
                          id: 'create-resources',
                          title: 'Создать ресурс',
                          icon: Plus,
                          route: '/resources/create',
                      },
                  ]
                : []),
        ];

        return items.map((item) => {
            return {
                ...item,
                current: currentRoute.id === item.route,
                onItemClick: () => {
                    void navigate({
                        to: item.route,
                    });
                },
            };
        });
    }, [auth.user, matches, navigate]);

    const renderFooter = React.useCallback(
        ({ asideRef }: { asideRef: React.RefObject<HTMLDivElement> }) => {
            const items = [
                ...(auth.user
                    ? [
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
    staticData: {
        crumb: OKO.title,
    },
});
