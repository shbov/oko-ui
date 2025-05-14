import type { SVGProps } from 'react';
import { useMemo } from 'react';

import {
    Database,
    House,
    Megaphone,
    PersonPlus,
    Persons,
    PersonXmark,
} from '@gravity-ui/icons';
import { useMatches, useNavigate, useRouter } from '@tanstack/react-router';

import { t } from '~/services/i18n';

import { useAuth } from './useAuth';

import type { MenuItem } from '@gravity-ui/navigation';

type Item = {
    id: string;
    title: string;
    icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
    current?: boolean;
    to: string;
};

export const useMenuItems = () => {
    const navigate = useNavigate();
    const matches = useMatches();
    const router = useRouter();
    const auth = useAuth(router);

    const menuItems: MenuItem[] = useMemo(() => {
        const currentRoute = matches.slice(-1)[0];

        const items: Item[] = [
            {
                id: 'id',
                title: t('menu.home'),
                icon: House,
                current: true,
                to: '/',
            },
            ...(auth.user
                ? [
                      {
                          id: 'resources',
                          title: t('menu.resources'),
                          icon: Database,
                          to: '/resources/',
                      },
                      {
                          id: 'channels',
                          title: t('menu.channels'),
                          icon: Megaphone,
                          to: '/channels/',
                      },
                  ]
                : []),
        ];

        return items.map((item) => {
            return {
                ...item,
                current: currentRoute.fullPath === item.to,
                onItemClick: () => {
                    void navigate({
                        to: item.to,
                    });
                },
            };
        });
    }, [auth.user, matches, navigate]);

    const footerItems = useMemo(() => {
        const items = [
            ...(auth.user
                ? [
                      ...(auth.user.is_admin
                          ? [
                                {
                                    title: t('menu.userManagement'),
                                    icon: Persons,
                                    onClick: () => {
                                        window.open(
                                            'http://130.193.45.10:8083/admin/',
                                            '_blank',
                                        );
                                    },
                                },
                            ]
                          : []),
                      {
                          title: t('menu.logout'),
                          icon: PersonXmark,
                          onClick: () => {
                              auth.logout();
                          },
                      },
                  ]
                : [
                      {
                          title: t('menu.login'),
                          icon: PersonPlus,
                          onClick: () => {
                              auth.login();
                          },
                      },
                  ]),
        ];

        return items;
    }, [auth]);

    return { menuItems, footerItems };
};
