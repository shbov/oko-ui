import { useCallback } from 'react';

import type { QueryError } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import type { HTTPError } from 'ky';

export const useApiError = () => {
    const handle = useCallback(async (err: HTTPError<QueryError>) => {
        const errorJson = await err.response?.json();

        toaster.add({
            name: 'api-hook-error',
            theme: 'danger',
            title: errorJson?.name || t('errors.default'),
            content: errorJson?.message || errorJson?.error || err.message,
        });
    }, []);

    return handle;
};
