import { getProtectedKyInstance } from '../utils';

import type {
    DeleteChannelRequest,
    GetChannelRequest,
    GetChannelResponse,
    listChannelsResponse,
} from './types';

const api = getProtectedKyInstance();

export const notification = {
    listChannels: () => {
        return api.get<listChannelsResponse>(`channels/all`).json();
    },
    deleteChannel: ({ id }: DeleteChannelRequest) => {
        return api.delete(`channels/${id}`).json();
    },
    getChannel: ({ id }: GetChannelRequest) => {
        return api.get<GetChannelResponse>(`channels/${id}`).json();
    },
};
