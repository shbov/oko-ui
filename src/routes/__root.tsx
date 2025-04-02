import type { RefObject } from 'react';
import { useCallback, useState } from 'react';

import { FaceRobot, Person } from '@gravity-ui/icons';
import { AsideHeader, FooterItem } from '@gravity-ui/navigation';
import { Flex, Icon, List } from '@gravity-ui/uikit';
import {
    createRootRouteWithContext,
    useNavigate,
} from '@tanstack/react-router';
import block from 'bem-cn-lite';

import { AppLayout } from '~/components/AppLayout';
import { NotFound } from '~/components/NotFound';
import { useMenuItems } from '~/hooks/useMenuItems';
import type { RouterContext } from '~/services/router/types';

import './root.scss';

const b = block('navigation');

const App = () => {
    const navigate = useNavigate();
    const { menuItems, footerItems } = useMenuItems();

    const [compact, setCompact] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);

    const renderFooter = useCallback(
        ({ asideRef }: { asideRef: RefObject<HTMLDivElement> }) => {
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
                                items={footerItems}
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
        [compact, footerItems, popupVisible],
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
