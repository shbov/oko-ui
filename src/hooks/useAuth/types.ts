import type { User, UserInfoResponse } from '~/services/api/user';

export type AuthState =
    | { user: null; status: 'PENDING' }
    | { user: null; status: 'UNAUTHENTICATED' }
    | { user: User; status: 'AUTHENTICATED' };

export type AuthUtils = {
    login: () => void;
    logout: () => void;
    ensureData: () => Promise<UserInfoResponse | undefined>;
};

export type AuthData = AuthState & AuthUtils;
