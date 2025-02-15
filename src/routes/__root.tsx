import * as React from 'react';

import { Person, House, FaceRobot, Plus } from '@gravity-ui/icons';
import { AsideHeader } from '@gravity-ui/navigation';
import {
    createRootRouteWithContext,
    useMatches,
    useNavigate,
} from '@tanstack/react-router';

import { AppLayout } from '~/components/AppLayout';
import { NotFound } from '~/components/NotFound';

import type { MenuItem } from '@gravity-ui/navigation';

const App = () => {
    const [compact, setCompact] = React.useState(true);
    const navigate = useNavigate();
    const matches = useMatches();

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
            {
                id: 'create-resources',
                title: 'Создать ресурс',
                icon: Plus,
                route: '/resources/create',
            },
            {
                id: 'login',
                title: 'Авторизация',
                icon: Person,
                route: '/auth/login',
            },
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
    }, [matches, navigate]);

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
        />
    );
};

export const Route = createRootRouteWithContext()({
    component: App,
    notFoundComponent: NotFound,
    staticData: {
        crumb: OKO.title,
    },
});
