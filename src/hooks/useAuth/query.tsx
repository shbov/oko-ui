import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '~/api';

export function authQueryOptions() {
    return queryOptions({
        queryKey: ['auth'],
        queryFn: () => api.user.auth(),
    });
}

export function useAuthQuery() {
    return useQuery(authQueryOptions());
}
