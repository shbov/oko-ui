import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.resource.getScreenshotByUrl);
export const getScreenshotByUrlSource = makePlainQueryDataSource({
    name: 'getScreenshotByUrl',
    fetch,
    transformResponse: (response) => response.data,
    options: {
        retry: false,
    },
});
