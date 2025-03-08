import { getProtectedKyInstance, getPublicKyInstance } from '../utils';

import type { LoginRequest, LoginResponse, RestorePasswordRequest, UserInfoResponse } from './types';

const protectedApi = getProtectedKyInstance(OKO.endpoints.userService);
const api = getPublicKyInstance(OKO.endpoints.userService);

export const user = {
    login: (data: LoginRequest) => {
        return api.post<LoginResponse>('users/login', { json: data }).json();
    },
    restorePassword: (data: RestorePasswordRequest) => {
        return api.post('users/restore-password', { json: data }).json();
    },
    logout: () => {
        return protectedApi.post('users/logout').json();
    },
    auth: () => {
        return protectedApi.post<UserInfoResponse>('users/info').json();
    },
};
