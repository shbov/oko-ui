import { useState } from 'react';

import {
    DefinitionList,
    Label,
    spacing,
    Tab,
    TabList,
    TabPanel,
    TabProvider,
} from '@gravity-ui/uikit';
import { createFileRoute } from '@tanstack/react-router';
import block from 'bem-cn-lite';
import ReactCompareImage from 'react-compare-image';
import ReactDiffViewer from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Page } from '~/components/Page';

import './Diff.scss';

const b = block('diff');

const oldCode = `12-12-2024 Serious liver injury being observed in patients without cirrhosis taking Ocaliva (obeticholic acid) to treat primary biliary cholangitis`;

const newCode = `01-22-2025 FDA adds Boxed Warning about a rare but serious allergic reaction called anaphylaxis with the multiple sclerosis medicine glatiramer acetate (Copaxone, Glatopa)`;

const html = `<div>
    <p>
        ${newCode}
    </p>
</div>`;

const title = `Событие от ${new Date().toLocaleString('ru')}`;

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
                <Tab value="parsedText">Только текст</Tab>
            </TabList>

            <div className={spacing({ mt: 3 })}>
                <TabPanel value="text">
                    <ReactDiffViewer oldValue={oldCode} newValue={newCode} />
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
                        style={github}
                        wrapLines
                        wrapLongLines
                    >
                        {html}
                    </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value="parsedText">
                    <SyntaxHighlighter
                        language="html"
                        style={github}
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
    return (
        <Page title={title}>
            <div className={b()}>
                <div className={spacing({ mb: 3 })}>
                    <DefinitionList>
                        <DefinitionList.Item name="Статус">
                            <Label theme="info">Новый</Label>
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
        </Page>
    );
};

export const Route = createFileRoute(
    '/resources/$resourceId/events/$eventId/_authenticated/',
)({
    component: Diff,
    staticData: {
        crumb: 'Изменения в ресурсе',
    },
});
