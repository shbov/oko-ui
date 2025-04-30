import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from './query';

export function useAuthQuery() {
    return useQuery(authQueryOptions());
}
