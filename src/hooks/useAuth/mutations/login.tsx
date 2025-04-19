import { useMutation } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '~/constants/auth';
import { useApiError } from '~/hooks/toasters';
import { api } from '~/services/api';
import type { LoginRequest } from '~/services/api/user';
import { dataManager } from '~/services/data-source';
import { toaster } from '~/services/toaster';
import { setCookie } from '~/utils/cookies';

export function useLoginMutation() {
    const handleError = useApiError();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginRequest) => api.user.login(data),
        onSuccess: (data) => {
            toaster.add({
                name: 'login-success',
                title: 'Вход выполнен успешно',
                content: `Добро пожаловать, ${data.user.name || data.user.username}!`,
                theme: 'success',
            });

            dataManager.queryClient.setQueryData(['auth'], { user: data.user });
            setCookie(ACCESS_TOKEN, data.accessToken);
        },
        onError: (err) => {
            void handleError(err);
            setCookie(ACCESS_TOKEN, '', 0);
        },
    });
}
