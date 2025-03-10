import type { FC } from 'react';

import { DataLoader as DataLoaderBase } from '@gravity-ui/data-source';

import { ErrorContainer } from '../ErrorContainer';
import { LoaderContainer } from '../LoaderContainer';

import type { DataLoaderProps } from './types';

export const DataLoader: FC<DataLoaderProps> = ({
    LoadingView = LoaderContainer,
    ErrorView = ErrorContainer,
    ...restProps
}) => {
    return (
        <DataLoaderBase
            LoadingView={LoadingView}
            ErrorView={ErrorView}
            {...restProps}
        />
    );
};
