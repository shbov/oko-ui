import { Text } from '@gravity-ui/uikit';

import { Id } from '~/components/Id';
import { UILink } from '~/components/UILink';
import type { Event } from '~/services/api/event';

import { EventStatus } from './EventStatus';
import { parseSnapshotId } from '../../snapshots/-utils';

import type { TableColumnConfig } from '@gravity-ui/uikit';

export const eventColumns: TableColumnConfig<Event>[] = [
    {
        id: 'id',
        name: 'ID',
        template: ({ id }) => <Id id={id} />,
        primary: true,
        meta: {
            copy: ({ id }: Event) => id,
        },
    },
    {
        id: 'status',
        name: 'Статус',
        template: ({ status }) => <EventStatus status={status} />,
        meta: {
            sort: true,
        },
    },
    {
        id: 'snapshot',
        name: 'Снимок',
        template: ({ snapshot_id, resource_id }) => (
            <UILink
                to={`/resources/$resourceId/snapshots/$snapshotId`}
                onClick={(e) => e.stopPropagation()}
                params={{
                    snapshotId: parseSnapshotId(snapshot_id),
                    resourceId: resource_id,
                }}
            >
                Перейти
            </UILink>
        ),
    },
    {
        id: 'type',
        name: 'Тип',
        template: ({ type }) => <Text>{type}</Text>,
    },
    {
        id: 'date',
        name: 'Дата события',
        template: ({ created_at }) => (
            <Text>{new Date(created_at).toLocaleString('ru')}</Text>
        ),
        meta: {
            sort: true,
        },
    },
];
