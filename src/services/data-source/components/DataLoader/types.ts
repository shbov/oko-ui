import type { ComponentType } from 'react';

import type { QueryError } from '../../types';
import type { ErrorContainerProps } from '../ErrorContainer';
import type { LoaderContainerProps } from '../LoaderContainer';
import type { DataLoaderProps as DataLoaderPropsBase } from '@gravity-ui/data-source';

export interface DataLoaderProps
    extends Omit<
        DataLoaderPropsBase<
            QueryError,
            LoaderContainerProps,
            ErrorContainerProps
        >,
        'LoadingView' | 'ErrorView'
    > {
    LoadingView?: ComponentType<LoaderContainerProps>;
    ErrorView?: ComponentType<ErrorContainerProps>;
}
