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
