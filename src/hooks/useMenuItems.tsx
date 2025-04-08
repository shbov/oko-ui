import type { SVGProps } from 'react';
import { useMemo } from 'react';

import {
    Database,
    House,
    Megaphone,
    Persons,
    PersonXmark,
} from '@gravity-ui/icons';
import { useMatches, useNavigate, useRouter } from '@tanstack/react-router';

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
                title: 'Главная',
                icon: House,
                current: true,
                to: '/',
            },
            ...(auth.user
                ? [
                      {
                          id: 'resources',
                          title: 'Ресурсы',
                          icon: Database,
                          to: '/resources/',
                      },
                      {
                          id: 'channels',
                          title: 'Каналы оповещения',
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
                : []),
        ];

        return items;
    }, [auth]);

    return { menuItems, footerItems };
};
