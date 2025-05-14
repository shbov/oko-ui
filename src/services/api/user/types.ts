export interface LoginRequest {
    email: string;
    password: string;
}

export interface RestorePasswordRequest {
    email: string;
}

export interface User {
    name: string;
    /**
     * @deprecated use `name` instead
     */
    username: string;
    email: string;
    createdAt: string;
    is_admin: boolean;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface UserInfoResponse {
    user: User;
}
