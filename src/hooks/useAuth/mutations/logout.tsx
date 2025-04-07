import { useMutation } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '~/constants/auth';
import { useApiError } from '~/hooks/toasters';
import { api } from '~/services/api';
import { dataManager } from '~/services/data-source';
import { deleteCookie } from '~/utils/cookies';

export function useLogoutMutation() {
    const handleError = useApiError();

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: () => api.user.logout(),
        onSuccess: () => {
            dataManager.queryClient.setQueryData(['auth'], null);
            deleteCookie(ACCESS_TOKEN);
        },
        onError: handleError,
    });
}
