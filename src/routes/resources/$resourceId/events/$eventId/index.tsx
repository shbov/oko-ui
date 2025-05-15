import { useCallback, useMemo, useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { Pencil, Check } from '@gravity-ui/icons';
import {
    Button,
    DefinitionList,
    Flex,
    Icon,
    Select,
    spacing,
} from '@gravity-ui/uikit';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { TABLE_ACTION_SIZE } from '~/constants/common';
import { getEventSource } from '~/data-sources';
import { getResourcesForDiffSource } from '~/data-sources/snapshot';
import { useApiError } from '~/hooks/toasters';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { DiffComponent } from '~/routes/resources/-components/DiffComponent/DiffComponent';
import { api } from '~/services/api';
import type { Event } from '~/services/api/event';
import { DataLoader, dataManager } from '~/services/data-source';
import { t } from '~/services/i18n';
import { toaster } from '~/services/toaster';

import { EventStatus } from '../-components/EventStatus';
import { downloadReport } from '../-utils';
import { getSnapshotId, parseSnapshotId } from '../../snapshots/-utils';

const getStatusOptionsForEvent = (event: Event | undefined) => {
    if (!event) {
        return [];
    }

    switch (event.status) {
        case 'CREATED':
            return [
                {
                    content: t('resources.events.statuses.watched'),
                    value: 'WATCHED',
                },
                {
                    content: t('resources.events.statuses.reacted'),
                    value: 'REACTED',
                },
            ];
        case 'NOTIFIED':
            return [
                {
                    content: t('resources.events.statuses.watched'),
                    value: 'WATCHED',
                },
                {
                    content: t('resources.events.statuses.reacted'),
                    value: 'REACTED',
                },
            ];
        case 'WATCHED':
            return [
                {
                    content: t('resources.events.statuses.reacted'),
                    value: 'REACTED',
                },
            ];
        default:
            return [];
    }
};

const EventPage = () => {
    const { eventId } = Route.useParams();
    const [isStatusEditing, setIsStatusEditing] = useState(false);
    const [status, setStatus] = useState<Event['status']>();
    const eventQuery = useQueryData(getEventSource, {
        id: eventId,
    });
    const handleError = useApiError();

    const primaryActions = useMemo(() => {
        return [
            {
                text: t('resources.events.download'),
                onClick: async () => {
                    await api.event
                        .downloadEventsCsv({
                            eventIds: [eventId],
                        })
                        .then((response) => {
                            toaster.add({
                                name: 'events-csv',
                                title: t(
                                    'resources.events.createReportSuccess',
                                ),
                                content: t(
                                    'resources.events.createReportSuccessMessage',
                                ),
                                theme: 'success',
                            });

                            downloadReport(response);
                        })
                        .catch(handleError);
                },
            },
        ];
    }, [eventId, handleError]);

    const onStatusUpdate = useCallback((status: string[]) => {
        setStatus(status[0] as Event['status']);
    }, []);

    const handleStatusEdit = useCallback(() => {
        if (isStatusEditing && status) {
            void api.event
                .updateStatus({
                    id: eventId,
                    status,
                })
                .then(() => {
                    toaster.add({
                        name: 'event-status-updated',
                        title: t('resources.events.statusUpdated'),
                        theme: 'success',
                    });

                    void dataManager.invalidateSource(getEventSource);
                })
                .catch(handleError);
        }
        setIsStatusEditing(!isStatusEditing);
    }, [isStatusEditing, status, eventId, handleError]);

    const currentSnapshotId = useMemo(
        () =>
            eventQuery.data?.snapshot_id
                ? Number(parseSnapshotId(eventQuery.data.snapshot_id))
                : 0,
        [eventQuery.data?.snapshot_id],
    );

    const resourcesForDiffQuery = useQueryData(
        getResourcesForDiffSource,
        {
            id: eventQuery.data?.snapshot_id ?? '',
        },
        {
            enabled: !!eventQuery.data?.snapshot_id,
        },
    );

    const previousResourcesForDiffQuery = useQueryData(
        getResourcesForDiffSource,
        {
            id: getSnapshotId({
                resourceId: eventQuery.data?.resource_id ?? '',
                snapshotId: currentSnapshotId - 1,
            }),
        },
        {
            enabled: currentSnapshotId > 0 && !!eventQuery.data?.snapshot_id,
        },
    );

    const image = useMemo(() => {
        if (!resourcesForDiffQuery.data?.image) {
            return null;
        }

        return `data:image/png;base64, ${resourcesForDiffQuery.data?.image ?? ''}`;
    }, [resourcesForDiffQuery.data?.image]);

    const oldImage = useMemo(() => {
        if (!previousResourcesForDiffQuery.data?.image) {
            return null;
        }

        return `data:image/png;base64, ${previousResourcesForDiffQuery.data?.image ?? ''}`;
    }, [previousResourcesForDiffQuery.data?.image]);

    return (
        <Page
            title={eventQuery.data?.name ?? ''}
            primaryActions={primaryActions}
        >
            <DataLoader
                status={eventQuery.status}
                error={eventQuery.error}
                errorAction={eventQuery.refetch}
            >
                <div>
                    <div className={spacing({ mb: 3 })}>
                        <DefinitionList>
                            <DefinitionList.Item
                                name={t('resources.events.status')}
                            >
                                <Flex gap={1}>
                                    {isStatusEditing ? (
                                        <Select
                                            options={getStatusOptionsForEvent(
                                                eventQuery.data,
                                            )}
                                            value={status ? [status] : []}
                                            onUpdate={onStatusUpdate}
                                            size="s"
                                        />
                                    ) : (
                                        <EventStatus
                                            status={eventQuery.data?.status}
                                            size="s"
                                        />
                                    )}

                                    {eventQuery.data?.status !== 'REACTED' && (
                                        <Button
                                            size="s"
                                            view="flat"
                                            onClick={handleStatusEdit}
                                        >
                                            <Icon
                                                data={
                                                    isStatusEditing
                                                        ? Check
                                                        : Pencil
                                                }
                                                size={TABLE_ACTION_SIZE}
                                            />
                                        </Button>
                                    )}
                                </Flex>
                            </DefinitionList.Item>
                            <DefinitionList.Item
                                name={t('resources.events.type')}
                            >
                                {t('resources.events.textChanges')}
                            </DefinitionList.Item>
                        </DefinitionList>
                    </div>

                    <DataLoader
                        status={resourcesForDiffQuery.status}
                        error={resourcesForDiffQuery.error}
                        errorAction={resourcesForDiffQuery.refetch}
                    >
                        <DiffComponent
                            html={resourcesForDiffQuery.data?.html ?? ''}
                            oldHtml={
                                previousResourcesForDiffQuery.data?.html ?? ''
                            }
                            text={resourcesForDiffQuery.data?.text ?? ''}
                            oldText={
                                previousResourcesForDiffQuery.data?.text ?? ''
                            }
                            screenshot={image}
                            oldScreenshot={oldImage}
                            isFirst={currentSnapshotId === 1}
                        />
                    </DataLoader>
                </div>
            </DataLoader>
        </Page>
    );
};

export const Route = createFileRoute('/resources/$resourceId/events/$eventId/')(
    WithAuth({
        component: EventPage,
    }),
);
