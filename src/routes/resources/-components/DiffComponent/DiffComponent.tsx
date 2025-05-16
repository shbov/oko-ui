import { Fragment, useState } from 'react';

import { Tab, TabList, TabPanel, TabProvider, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from 'react-compare-slider';
import ReactDiffViewer from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './DiffComponent.scss';

const b = block('diff-component');

export const DiffComponent = ({
    html,
    oldHtml,
    text,
    oldText,
    screenshot,
    oldScreenshot,
    isFirst,
}: {
    html: string | undefined;
    oldHtml: string | undefined;
    text: string | undefined;
    oldText: string | undefined;
    screenshot: string | null;
    oldScreenshot: string | null;
    isFirst: boolean;
}) => {
    const isTextDefined = text !== undefined;
    const isOldTextDefined = oldText !== undefined;
    const isHtmlDefined = html !== undefined;
    const isOldHtmlDefined = oldHtml !== undefined;
    const isScreenshotDefined = screenshot !== null;
    const isOldScreenshotDefined = oldScreenshot !== null;

    const [activeTab, setActiveTab] = useState(() => {
        if (isScreenshotDefined) {
            return 'image';
        }

        if (isTextDefined) {
            return 'text';
        }

        if (isHtmlDefined) {
            return 'html';
        }

        return '';
    });

    return (
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
            <TabList>
                {isFirst ? (
                    <Fragment>
                        {isTextDefined && <Tab value="text">Только текст</Tab>}
                        {isScreenshotDefined && (
                            <Tab value="image">Только скриншот</Tab>
                        )}
                        {isHtmlDefined && <Tab value="html">Только HTML</Tab>}
                    </Fragment>
                ) : (
                    <Fragment>
                        {isTextDefined && isOldTextDefined && (
                            <Tab value="textDiff">Изменения в тексте</Tab>
                        )}
                        {isTextDefined && <Tab value="text">Только текст</Tab>}
                        {isScreenshotDefined && isOldScreenshotDefined && (
                            <Tab value="imageDiff">Изменения в скриншотах</Tab>
                        )}
                        {isScreenshotDefined && (
                            <Tab value="image">Только скриншот</Tab>
                        )}
                        {isHtmlDefined && isOldHtmlDefined && (
                            <Tab value="htmlDiff">Изменения в HTML</Tab>
                        )}
                        {isHtmlDefined && <Tab value="html">Только HTML</Tab>}
                    </Fragment>
                )}
            </TabList>

            <div className={b()}>
                <TabPanel value="imageDiff">
                    {activeTab === 'imageDiff' &&
                        isScreenshotDefined &&
                        isOldScreenshotDefined && (
                            <ReactCompareSlider
                                itemOne={
                                    <ReactCompareSliderImage
                                        src={oldScreenshot}
                                        alt="Old screenshot"
                                    />
                                }
                                itemTwo={
                                    <ReactCompareSliderImage
                                        src={screenshot}
                                        alt="New screenshot"
                                    />
                                }
                            />
                        )}
                </TabPanel>
                <TabPanel value="image">
                    {activeTab === 'image' && isScreenshotDefined && (
                        <img
                            src={screenshot}
                            alt="New screenshot"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    )}
                </TabPanel>
                <TabPanel value="html">
                    {activeTab === 'html' && isHtmlDefined && (
                        <SyntaxHighlighter
                            language="html"
                            style={oneDark}
                            wrapLines
                            wrapLongLines
                        >
                            {html}
                        </SyntaxHighlighter>
                    )}
                </TabPanel>
                <TabPanel value="htmlDiff">
                    {activeTab === 'htmlDiff' &&
                        isHtmlDefined &&
                        isOldHtmlDefined && (
                            <ReactDiffViewer
                                oldValue={oldHtml}
                                newValue={html}
                                splitView={true}
                                useDarkTheme
                            />
                        )}
                </TabPanel>
                <TabPanel value="text">
                    {activeTab === 'text' && isTextDefined && (
                        <SyntaxHighlighter
                            language="html"
                            style={oneDark}
                            wrapLines
                            wrapLongLines
                        >
                            {text}
                        </SyntaxHighlighter>
                    )}
                </TabPanel>
                <TabPanel value="textDiff">
                    {activeTab === 'textDiff' &&
                        isTextDefined &&
                        isOldTextDefined && (
                            <Text variant="code-1">
                                <ReactDiffViewer
                                    oldValue={oldText}
                                    newValue={text}
                                    splitView
                                    useDarkTheme
                                />
                            </Text>
                        )}
                </TabPanel>
            </div>
        </TabProvider>
    );
};
