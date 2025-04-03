import { Text } from '@gravity-ui/uikit';

import { UILink } from '~/components/UILink';
import type { Event } from '~/services/api/event';

import { EventStatus } from './EventStatus';

import type { TableColumnConfig } from '@gravity-ui/uikit';

export const eventColumns: TableColumnConfig<Event>[] = [
    {
        id: 'id',
        name: 'ID',
        template: ({ id }) => <Text>{id}</Text>,
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
        name: 'Снапшот',
        template: ({ snapshot_id, resource_id }) => (
            <UILink
                to={`/resources/$resourceId/snapshots/$snapshotId`}
                params={{
                    snapshotId: snapshot_id,
                    resourceId: resource_id,
                }}
            >
                {snapshot_id}
            </UILink>
        ),
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
