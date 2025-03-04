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
    LoadingView?: React.ComponentType<LoaderContainerProps>;
    ErrorView?: React.ComponentType<ErrorContainerProps>;
}
