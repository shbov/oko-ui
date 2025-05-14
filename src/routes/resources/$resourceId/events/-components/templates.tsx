import { Text } from '@gravity-ui/uikit';

import { Id } from '~/components/Id';
import { UILink } from '~/components/UILink';
import type { Event } from '~/services/api/event';
import { t } from '~/services/i18n';

import { EventStatus } from './EventStatus';
import { parseSnapshotId } from '../../snapshots/-utils';

import type { TableColumnConfig } from '@gravity-ui/uikit';

export const eventColumns: TableColumnConfig<Event>[] = [
    {
        id: 'id',
        name: t('resources.events.id'),
        template: ({ id }) => <Id id={id} />,
        primary: true,
        meta: {
            copy: ({ id }: Event) => id,
        },
    },
    {
        id: 'status',
        name: t('resources.events.status'),
        template: ({ status }) => <EventStatus status={status} />,
        meta: {
            sort: true,
        },
    },
    {
        id: 'snapshot',
        name: t('resources.events.snapshot'),
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
        id: 'name',
        name: t('resources.events.name'),
        template: ({ name }) => <Text>{name}</Text>,
    },
    {
        id: 'date',
        name: t('resources.events.date'),
        template: ({ created_at }) => (
            <Text>{new Date(created_at).toLocaleString('ru')}</Text>
        ),
        meta: {
            sort: true,
        },
    },
];
