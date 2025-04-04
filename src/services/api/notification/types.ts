export enum ChannelType {
    Telegram = 'telegram',
    Email = 'email',
}

export interface Channel {
    id: string;
    name: string;
    type: ChannelType;
}

export interface listChannelsResponse {
    channels: Channel[];
}

export interface GetChannelRequest {
    id: string;
}

export interface GetChannelResponse {
    channel: Channel;
}

export interface DeleteChannelRequest {
    id: string;
}
