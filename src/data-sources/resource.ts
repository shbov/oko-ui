import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.resource.getScreenshotByUrl);
export const getScreenshotByUrlSource = makePlainQueryDataSource({
    name: 'getScreenshotByUrl',
    fetch,
    transformResponse: (response) => response.screenshot,
});

export const listResources = makePlainQueryDataSource({
    name: 'resource',
    fetch: skipContext(api.resource.listResources),
});

export const getResource = makePlainQueryDataSource({
    name: 'resource',
    fetch: skipContext(api.resource.get),
});
