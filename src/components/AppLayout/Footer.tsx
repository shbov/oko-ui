import * as React from 'react';

import { Code, FaceRobot } from '@gravity-ui/icons';
import {
    Footer as FooterUI,
    type FooterMenuItem,
} from '@gravity-ui/navigation';
import { Icon } from '@gravity-ui/uikit';
import { useNavigate } from '@tanstack/react-router';

export const Footer = () => {
    const navigate = useNavigate();

    const menuItems: FooterMenuItem[] = React.useMemo(
        () => [
            {
                id: 'home',
                text: 'Главная',
                onClick: () => {
                    void navigate({
                        to: '/',
                    });
                },
            },
            {
                id: 'github',
                text: 'Github',
                iconStart: <Icon data={Code} />,
                onClick: () => {
                    window.open('https://github.com/shbov/oko-ui', '_blank');
                },
            },
        ],
        [navigate],
    );

    return (
        <FooterUI
            withDivider
            menuItems={menuItems}
            copyright={`${OKO.title} ${new Date().getFullYear()}. Version ${OKO.version}`}
            logo={{
                text: OKO.title,
                icon: FaceRobot,
            }}
        />
    );
};
