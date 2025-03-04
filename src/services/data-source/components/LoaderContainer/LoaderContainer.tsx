import React from 'react';

import { Loader } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './LoaderContainer.scss';

import type { LoaderProps } from '@gravity-ui/uikit';

const b = block('loader-container');

export interface LoaderContainerProps extends Omit<LoaderProps, 'className'> {
    className?: string;
    innerClassName?: string;
}

export const LoaderContainer: React.FC<LoaderContainerProps> = ({
    className,
    innerClassName,
    size = 'l',
    ...restProps
}) => {
    return (
        <div className={b(null, className)}>
            <Loader {...restProps} size={size} className={innerClassName} />
        </div>
    );
};
