import ky, { HTTPError } from 'ky';

import { ACCESS_TOKEN } from '~/constants/auth';

import type { RefreshTokenResponse } from './user';

const commonSettings = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const getProtectedKyInstance = () =>
    ky.create({
        ...commonSettings,
        prefixUrl: '/api',
        credentials: 'include',
        hooks: {
            beforeRequest: [
                (request) => {
                    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
                    if (!accessToken) return;

                    request.headers.set(
                        'Authorization',
                        `Bearer ${accessToken}`,
                    );
                },
            ],
            beforeRetry: [
                async ({ request, error, options }) => {
                    if (
                        error instanceof HTTPError &&
                        error.response.status === 401
                    ) {
                        const data = await ky
                            .get('refresh', { ...options, retry: 0 })
                            .json<RefreshTokenResponse>();

                        const newAccessToken = data.accessToken;

                        sessionStorage.setItem(ACCESS_TOKEN, newAccessToken);

                        request.headers.set(
                            'Authorization',
                            `Bearer ${newAccessToken}`,
                        );
                    }
                },
            ],
        },
        retry: {
            statusCodes: [401],
            limit: 1,
        },
    });

export const getPublicKyInstance = () =>
    ky.create({
        ...commonSettings,
        prefixUrl: '/api',
    });
