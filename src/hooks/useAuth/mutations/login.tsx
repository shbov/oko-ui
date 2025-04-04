import { useMutation } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '~/constants/auth';
import { useApiError } from '~/hooks/toasters';
import { api } from '~/services/api';
import type { LoginRequest } from '~/services/api/user';
import { dataManager } from '~/services/data-source';
import { toaster } from '~/services/toaster';

export function useLoginMutation() {
    const handleError = useApiError();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginRequest) => api.user.login(data),
        onSuccess: (data) => {
            dataManager.queryClient.setQueryData(['auth'], { user: data.user });
            sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);

            toaster.add({
                name: 'login-success',
                title: 'Login Successful',
                content: `Welcome, ${data.user.name}!`,
                theme: 'success',
            });
        },
        onError: (err) => {
            void handleError(err);
            sessionStorage.removeItem(ACCESS_TOKEN);
        },
    });
}
