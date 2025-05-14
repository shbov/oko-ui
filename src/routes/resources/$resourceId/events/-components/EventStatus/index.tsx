import { Label } from '@gravity-ui/uikit';

import type { Event } from '~/services/api/event';

import { QA } from './qa';

export const EventStatus = ({
    status,
    size = 'xs',
}: {
    status: Event['status'] | undefined;
    size?: 'xs' | 's' | 'm';
}) => {
    switch (status) {
        case 'CREATED':
            return (
                <Label theme="normal" qa={QA.CREATED} size={size}>
                    Создано
                </Label>
            );
        case 'NOTIFIED':
            return (
                <Label theme="info" qa={QA.NOTIFIED} size={size}>
                    Отправлено
                </Label>
            );
        case 'WATCHED':
            return (
                <Label theme="warning" qa={QA.WATCHED} size={size}>
                    Просмотрено
                </Label>
            );
        case 'REACTED':
            return (
                <Label theme="success" qa={QA.REACTED} size={size}>
                    Отреагировано
                </Label>
            );
        default:
            return (
                <Label theme="unknown" qa={QA.UNKNOWN} size={size}>
                    Неизвестно
                </Label>
            );
    }
};
