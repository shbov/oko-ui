import { useMutation } from '@tanstack/react-query';

import { api } from '~/api';
import type { LoginRequest } from '~/api/user';
import { ACCESS_TOKEN } from '~/constants/auth';
import { useApiError } from '~/hooks/toasters';
import { dataManager } from '~/services/data-source';

export function useLoginMutation() {
    const handleError = useApiError();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginRequest) => api.user.login(data),
        onSuccess: (data) => {
            dataManager.queryClient.setQueryData(['auth'], { user: data.user });
            sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
        },
        onError: (err) => {
            void handleError(err);
            sessionStorage.removeItem(ACCESS_TOKEN);
        },
    });
}
