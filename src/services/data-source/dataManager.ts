import { ClientDataManager } from '@gravity-ui/data-source';

import type { AxiosError } from 'axios';

export const dataManager = new ClientDataManager();

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}
