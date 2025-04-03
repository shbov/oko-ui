import { Label } from '@gravity-ui/uikit';

import type { Event } from '~/services/api/event';

export const EventStatus = ({
    status,
}: {
    status: Event['status'] | undefined;
}) => {
    switch (status) {
        case 'CREATED':
            return <Label theme="normal">Создано</Label>;
        case 'NOTIFIED':
            return <Label theme="info">Отправлено</Label>;
        case 'WATCHED':
            return <Label theme="warning">Просмотрено</Label>;
        case 'REACTED':
            return <Label theme="success">Отреагировано</Label>;
        default:
            return <Label theme="unknown">Неизвестно</Label>;
    }
};
