import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.notification.listChannels);
export const listChannelsSource = makePlainQueryDataSource({
    name: 'listChannels',
    fetch,
    transformResponse: (response) => response.data,
    options: {
        retry: false,
    },
});
