import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.notification.listChannels);
export const listChannelsSource = makePlainQueryDataSource({
    name: 'listChannels',
    fetch,
    transformResponse: (response) => response.channels.filter((channel) => channel.enabled),
});

const getChannelFetch = skipContext(api.notification.getChannel);
export const getChannelSource = makePlainQueryDataSource({
    name: 'getChannel',
    fetch: getChannelFetch,
    transformResponse: (response) => response.channel,
});
