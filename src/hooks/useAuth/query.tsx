import { queryOptions } from '@tanstack/react-query';

import { api } from '~/services/api';

export function authQueryOptions() {
    return queryOptions({
        queryKey: ['auth'],
        queryFn: () => api.user.auth(),
        retry: 0,
    });
}
