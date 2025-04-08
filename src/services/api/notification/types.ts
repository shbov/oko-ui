export enum ChannelType {
    Telegram = 'telegram',
    Email = 'email',
}

export type Channel = {
    id: string;
    name: string;
} & (
    | { type: ChannelType.Telegram; chatId: string }
    | { type: ChannelType.Email; email: string }
);

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

export type CreateChannelRequest = {
    name: string;
} & (
    | { type: ChannelType.Telegram; chatId: string }
    | { type: ChannelType.Email; email: string }
);

export interface CreateChannelResponse {
    channel: Channel;
}

export type EditChannelRequest = {
    id: string;
    name: string;
} & (
    | { type: ChannelType.Telegram; chatId: string }
    | { type: ChannelType.Email; email: string }
);

export interface EditChannelResponse {
    channel: Channel;
}
