import { getStoryContext } from '@storybook/test-runner';
import { configureAxe, injectAxe } from 'axe-playwright';

import type { TestRunnerConfig } from '@storybook/test-runner';

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
    async preVisit(page) {
        await injectAxe(page);
    },
    async postVisit(page, context) {
        // Get the entire context of a story, including parameters, args, argTypes, etc.
        const storyContext = await getStoryContext(page, context);

        // Apply story-level a11y rules
        await configureAxe(page, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rules: storyContext.parameters?.a11y?.config?.rules,
            reporter: 'no-passes',
        });
    },
};

export default config;
