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
    restorePassword: (_data: RestorePasswordRequest) => {
        return Promise.resolve();
    },
    logout: () => {
        return protectedApi.post('users/logout').json();
    },
    auth: () => {
        return protectedApi.get<UserInfoResponse>('users/info').json();
    },
};
