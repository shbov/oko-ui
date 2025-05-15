import ky, { HTTPError } from 'ky';

import { ACCESS_TOKEN } from '~/constants/auth';
import { getCookie, setCookie } from '~/utils/cookies';

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
                    const accessToken = getCookie(ACCESS_TOKEN);
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
                            .get('/api/refresh', { ...options, retry: 0 })
                            .json<RefreshTokenResponse>();

                        const newAccessToken = data.accessToken;

                        setCookie(ACCESS_TOKEN, newAccessToken);

                        request.headers.set(
                            'Authorization',
                            `Bearer ${newAccessToken}`,
                        );
                    }
                },
            ],
        },
        retry: {
            statusCodes: [400, 401, 403],
            limit: 0,
        },
    });

export const getPublicKyInstance = () =>
    ky.create({
        ...commonSettings,
        prefixUrl: '/api',
    });
