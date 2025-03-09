import * as React from 'react';

import type { QueryError } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import type { HTTPError } from 'ky';

export const useApiError = () => {
    const handle = React.useCallback(async (err: HTTPError<QueryError>) => {
        const errorJson = await err.response?.json();

        toaster.add({
            name: 'api-hook-error',
            theme: 'danger',
            title: errorJson?.name || 'Ошибка',
            content: errorJson?.message || errorJson?.error || err.message,
        });
    }, []);

    return handle;
};
