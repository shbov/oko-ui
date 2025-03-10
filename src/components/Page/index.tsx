import * as React from 'react';

import { spacing, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './Page.scss';

const b = block('page');

export const Page = ({
    children,
    title,
    className,
}: {
    title: string;
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={b()}>
            <div className={spacing({ mb: 4 })}>
                <Text variant="subheader-3">{title}</Text>
            </div>

            <div className={className}>{children}</div>
        </div>
    );
};
