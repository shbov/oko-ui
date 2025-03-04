import {
    type PlainQueryDataSource,
    makePlainQueryDataSource as makePlainQueryDataSourceBase,
    withCancellation,
} from '@gravity-ui/data-source';

import type { QueryError } from './types';

export const makePlainQueryDataSource = <
    TParams,
    TRequest,
    TResponse,
    TData,
    TError = QueryError,
>(
    config: Omit<
        PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError>,
        'type'
    >,
): PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError> => {
    const dataSource = makePlainQueryDataSourceBase(config);

    dataSource.fetch = withCancellation<typeof dataSource>(dataSource.fetch);

    return dataSource;
};
