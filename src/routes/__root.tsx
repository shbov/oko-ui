import * as React from 'react';

import { Person, CopyPlus, FaceRobot } from '@gravity-ui/icons';
import { AsideHeader } from '@gravity-ui/navigation';
import {
    createRootRouteWithContext,
    useNavigate,
} from '@tanstack/react-router';

import { AppLayout } from '~/components/AppLayout';
import { NotFound } from '~/components/NotFound';

import type { MenuItem } from '@gravity-ui/navigation';

const App = () => {
    const [compact, setCompact] = React.useState(true);
    const navigate = useNavigate();

    const menuItems: MenuItem[] = React.useMemo(
        () => [
            {
                id: 'home',
                title: 'Главная',
                icon: CopyPlus,
                onItemClick: () => {
                    void navigate({
                        to: '/',
                    });
                },
            },
            {
                id: 'login',
                title: 'Авторизация',
                icon: Person,
                onItemClick: () => {
                    void navigate({
                        to: '/auth/login',
                    });
                },
            },
        ],
        [navigate],
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
