import { ClientDataManager } from '@gravity-ui/data-source';

import type { QueryError } from './types';
import type { HTTPError } from 'ky';

export const dataManager = new ClientDataManager();

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: HTTPError<QueryError>;
    }
}
