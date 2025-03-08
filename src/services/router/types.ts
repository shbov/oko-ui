import type { AuthData } from '~/hooks/useAuth/types';

import type { ClientDataManager } from '@gravity-ui/data-source';

export type RouterContext = {
    auth: AuthData;
    dataManager: ClientDataManager;
};
