import { useCallback, useState } from 'react';

import { FaceRobot } from '@gravity-ui/icons';
import { AsideHeader, FooterItem } from '@gravity-ui/navigation';
import {
    createRootRouteWithContext,
    useNavigate,
} from '@tanstack/react-router';

import { AppLayout } from '~/components/AppLayout';
import { NotFound } from '~/components/NotFound';
import { useMenuItems } from '~/hooks/useMenuItems';
import type { RouterContext } from '~/services/router/types';

import './root.scss';

const App = () => {
    const navigate = useNavigate();
    const { menuItems, footerItems } = useMenuItems();

    const [compact, setCompact] = useState(true);

    const renderFooter = useCallback(() => {
        return footerItems.map((item) => (
            <FooterItem
                key={item.title}
                compact={compact}
                item={{
                    id: item.title,
                    icon: item.icon,
                    title: item.title,
                    tooltipText: item.title,
                    onItemClick: item.onClick,
                }}
            />
        ));
    }, [compact, footerItems]);

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
