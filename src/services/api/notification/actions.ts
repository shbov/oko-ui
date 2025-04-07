import { getProtectedKyInstance } from '../utils';

import type {
    DeleteChannelRequest,
    GetChannelRequest,
    GetChannelResponse,
    listChannelsResponse,
    CreateChannelRequest,
    CreateChannelResponse,
    EditChannelRequest,
    EditChannelResponse,
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
    createChannel: (data: CreateChannelRequest) => {
        return api
            .post<CreateChannelResponse>('channels/create', {
                json: data,
            })
            .json();
    },
    editChannel: (data: EditChannelRequest) => {
        return api
            .patch<EditChannelResponse>(`channels/${data.id}`, {
                json: data,
            })
            .json();
    },
};
