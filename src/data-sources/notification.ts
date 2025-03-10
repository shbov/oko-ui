import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.notification.listChannels);
export const listChannelsSource = makePlainQueryDataSource({
    name: 'listChannels',
    fetch,
});
