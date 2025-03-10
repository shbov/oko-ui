import { skipContext } from '@gravity-ui/data-source';

import { api } from '~/services/api';
import { makePlainQueryDataSource } from '~/services/data-source';

const fetch = skipContext(api.user.login);
export const loginSource = makePlainQueryDataSource({
    name: 'loginSource',
    fetch,
});
