import { useQueryData } from '@gravity-ui/data-source';
import { DefinitionList, spacing } from '@gravity-ui/uikit';
import { createFileRoute } from '@tanstack/react-router';
import block from 'bem-cn-lite';

import { Page } from '~/components/Page';
import { getEventSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
import { DiffComponent } from '~/routes/resources/-components/DiffComponent/DiffComponent';
import { DataLoader } from '~/services/data-source';

import './Diff.scss';
import { EventStatus } from '../-components/EventStatus';

const b = block('diff');

const oldCode = `12-12-2024 Serious liver injury being observed in patients without cirrhosis taking Ocaliva (obeticholic acid) to treat primary biliary cholangitis`;

const newCode = `01-22-2025 FDA adds Boxed Warning about a rare but serious allergic reaction called anaphylaxis with the multiple sclerosis medicine glatiramer acetate (Copaxone, Glatopa)`;

const html = `<div>
    <p>
        ${newCode}
    </p>
</div>`;

const Diff = () => {
    const { eventId } = Route.useParams();
    const eventQuery = useQueryData(getEventSource, {
        id: eventId,
    });

    return (
        <Page title={eventQuery.data?.name ?? ''}>
            <DataLoader
                status={eventQuery.status}
                error={eventQuery.error}
                errorAction={eventQuery.refetch}
            >
                <div className={b()}>
                    <div className={spacing({ mb: 3 })}>
                        <DefinitionList>
                            <DefinitionList.Item name="Статус">
                                <EventStatus status={eventQuery.data?.status} />
                            </DefinitionList.Item>
                            <DefinitionList.Item name="Тип события">
                                Изменения в тексте
                            </DefinitionList.Item>
                        </DefinitionList>
                    </div>

                    <DiffComponent
                        html={html}
                        oldHtml={html}
                        text={newCode}
                        oldText={oldCode}
                        screenshot={'/after.png'}
                        oldScreenshot={'/before.png'}
                        isFirst={false}
                    />
                </div>
            </DataLoader>
        </Page>
    );
};

export const Route = createFileRoute('/resources/$resourceId/events/$eventId/')(
    WithAuth({
        component: Diff,
    }),
);
