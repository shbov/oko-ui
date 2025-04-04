import { useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import {
    DefinitionList,
    spacing,
    Tab,
    TabList,
    TabPanel,
    TabProvider,
    Text,
} from '@gravity-ui/uikit';
import { createFileRoute } from '@tanstack/react-router';
import block from 'bem-cn-lite';
import ReactCompareImage from 'react-compare-image';
import ReactDiffViewer from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Page } from '~/components/Page';
import { getEventSource } from '~/data-sources';
import { WithAuth } from '~/packages/middlewares/WithAuth';
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

const DiffComponent = ({
    oldCode,
    newCode,
    html,
}: {
    oldCode: string;
    newCode: string;
    html: string;
}) => {
    const [activeTab, setActiveTab] = useState('text');

    return (
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
            <TabList>
                <Tab value="text">Изменения в тексте</Tab>
                <Tab value="image">Изменения в скриншотах</Tab>
                <Tab value="html">HTML</Tab>
                <Tab value="htmlDiff">Изменения в HTML</Tab>
                <Tab value="parsedText">Только текст</Tab>
            </TabList>

            <div className={spacing({ mt: 3 })}>
                <TabPanel value="text">
                    <Text variant="code-1">
                        <ReactDiffViewer
                            oldValue={oldCode}
                            newValue={newCode}
                            splitView={false}
                            useDarkTheme
                        />
                    </Text>
                </TabPanel>
                <TabPanel value="image">
                    <ReactCompareImage
                        leftImage="/before.png"
                        rightImage="/after.png"
                    />
                </TabPanel>
                <TabPanel value="html">
                    <SyntaxHighlighter
                        language="html"
                        style={darcula}
                        wrapLines
                        wrapLongLines
                    >
                        {html}
                    </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value="htmlDiff">
                    <ReactDiffViewer
                        oldValue={oldCode}
                        newValue={newCode}
                        splitView={false}
                        useDarkTheme
                    />
                </TabPanel>
                <TabPanel value="parsedText">
                    <SyntaxHighlighter
                        language="html"
                        style={darcula}
                        wrapLines
                        wrapLongLines
                    >
                        {newCode}
                    </SyntaxHighlighter>
                </TabPanel>
            </div>
        </TabProvider>
    );
};

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
                        oldCode={oldCode}
                        newCode={newCode}
                        html={html}
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
