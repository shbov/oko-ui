import { Label } from '@gravity-ui/uikit';

import type { Resource } from '~/services/api/resource';

export const ResourceStatus = ({ status }: { status: Resource['status'] }) => {
    switch (status) {
        case 'active':
            return <Label theme="success">Активен</Label>;
        case 'paused':
            return <Label theme="warning">Приостановлен</Label>;
        default:
            return <Label theme="unknown">Неизвестный статус</Label>;
    }
};
