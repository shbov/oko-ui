import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { spacing, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import { usePageActions } from '~/components/AppLayout/PageActionsContext';
import type {
    PrimaryPageAction,
    SecondaryPageAction,
} from '~/components/AppLayout/PageActionsContext';

import './Page.scss';

const b = block('page');

export const Page = ({
    children,
    title,
    className,
    isLoading = false,
    primaryActions,
    secondaryActions,
}: {
    title: string;
    className?: string;
    children: ReactNode;
    isLoading?: boolean;
    primaryActions?: PrimaryPageAction[];
    secondaryActions?: SecondaryPageAction[];
}) => {
    const actions = usePageActions();

    useEffect(() => {
        if (actions) {
            actions.setPrimaryActions(primaryActions || []);
            actions.setSecondaryActions(secondaryActions || []);

            return () => {
                actions.setPrimaryActions([]);
                actions.setSecondaryActions([]);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primaryActions, secondaryActions]);

    return (
        <div className={b()}>
            <div className={spacing({ mb: 4 })}>
                {!isLoading && <Text variant="header-1">{title}</Text>}
            </div>

            <div className={className}>{children}</div>
        </div>
    );
};
