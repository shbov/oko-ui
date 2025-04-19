import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import type {
    ListResourcesResponse,
    GetResourceResponse,
    Resource,
} from '~/services/api/resource';
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
    transformResponse: (response: ListResourcesResponse) => {
        return {
            ...response,
            resources: response.resources.map((resource: Resource) => ({
                ...resource,
                starts_from: resource.starts_from
                    ? resource.starts_from * 1000
                    : undefined,
            })),
        };
    },
});

export const getResource = makePlainQueryDataSource({
    name: 'resource',
    fetch: skipContext(api.resource.get),
    transformResponse: (response: GetResourceResponse) => {
        return {
            ...response,
            resource: response.resource
                ? {
                      ...response.resource,
                      starts_from: response.resource.starts_from
                          ? response.resource.starts_from * 1000
                          : undefined,
                  }
                : undefined,
        };
    },
});
