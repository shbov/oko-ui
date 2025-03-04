import { ChannelType } from './types';

export const notification = {
    listChannels: () => {
        return Promise.resolve({
            data: {
                // mock
                channels: [
                    {
                        id: '1231231-2-312-312-312-3',
                        name: 'Project Alerts',
                        type: ChannelType.Telegram,
                    },
                ],
            },
        });
    },
};
