import { useMemo } from 'react';

import { Code, FaceRobot } from '@gravity-ui/icons';
import {
    Footer as FooterUI,
    type FooterMenuItem,
} from '@gravity-ui/navigation';
import { Icon } from '@gravity-ui/uikit';
import { useRouter } from '@tanstack/react-router';

export const Footer = () => {
    const router = useRouter();

    const menuItems: FooterMenuItem[] = useMemo(
        () => [
            {
                id: 'home',
                text: 'Главная',
                onClick: () => {
                    void router.navigate({
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
        [router],
    );

    return (
        <FooterUI
            withDivider
            menuItems={menuItems}
            copyright={`${OKO.title} ${new Date().getFullYear()}. Version ${OKO.version}`}
            logo={{
                text: OKO.title,
                icon: FaceRobot,
                onClick: () => {
                    void router.navigate({
                        to: '/',
                    });
                },
            }}
        />
    );
};
