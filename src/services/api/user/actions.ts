import { getProtectedKyInstance, getPublicKyInstance } from '../utils';

import type {
    LoginRequest,
    LoginResponse,
    RestorePasswordRequest,
    UserInfoResponse,
} from './types';

const protectedApi = getProtectedKyInstance();
const api = getPublicKyInstance();

export const user = {
    login: (data: LoginRequest) => {
        return api.post<LoginResponse>('users/login', { json: data }).json();
    },
    restorePassword: (data: RestorePasswordRequest) => {
        return api.post('users/reset', { json: data }).json();
    },
    logout: () => {
        return protectedApi.post('users/logout').json();
    },
    auth: () => {
        return protectedApi.get<UserInfoResponse>('users/info').json();
    },
};
