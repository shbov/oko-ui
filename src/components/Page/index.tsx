import * as React from 'react';

import { spacing, Text } from '@gravity-ui/uikit';

export const Page = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) => {
    return (
        <div className={spacing({ m: 4 })}>
            <div className={spacing({ mb: 4 })}>
                <Text variant="subheader-3">{title}</Text>
            </div>

            <div>{children}</div>
        </div>
    );
};
