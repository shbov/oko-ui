import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useLogoutMutation } from './mutations';
import { authQueryOptions, useAuthQuery } from './query';

import type { AuthData, AuthUtils } from './types';
import type { Register } from '@tanstack/react-router';

export const useAuth = (router: Register['router']): AuthData => {
    const authQuery = useAuthQuery();
    const signOutMutation = useLogoutMutation();

    const queryClient = useQueryClient();

    useEffect(() => {
        void router.invalidate();
    }, [authQuery.data, router]);

    useEffect(() => {
        if (authQuery.error === null) {
            return;
        }

        queryClient.setQueryData(['auth'], null);
    }, [authQuery.error, queryClient]);

    const utils: AuthUtils = {
        login: () => {
            void router.navigate({ to: '/auth/login' });
        },
        logout: () => {
            signOutMutation.mutate();
        },
        ensureData: () => {
            return queryClient.ensureQueryData(authQueryOptions());
        },
    };

    switch (true) {
        case authQuery.isPending:
            return { ...utils, user: null, status: 'PENDING' };

        case !authQuery.data:
            return { ...utils, user: null, status: 'UNAUTHENTICATED' };

        default:
            return {
                ...utils,
                user: {
                    ...authQuery.data.user,
                    name: authQuery.data.user.username,
                },
                status: 'AUTHENTICATED',
            };
    }
};
