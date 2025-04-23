import {
    type PlainQueryDataSource,
    makePlainQueryDataSource as makePlainQueryDataSourceBase,
    withCancellation,
} from '@gravity-ui/data-source';

import type { QueryError } from './types';

// Создание источника данных с поддержкой отмены запросов
// Обертка над базовым makePlainQueryDataSource с добавлением функционала отмены
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
    // Создание базового источника данных
    const dataSource = makePlainQueryDataSourceBase(config);

    // Добавление поддержки отмены запросов
    dataSource.fetch = withCancellation<typeof dataSource>(dataSource.fetch);

    return dataSource;
};
