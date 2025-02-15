import { Text } from '@gravity-ui/uikit';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

import { Page } from '~/components/Page';

export const Index = () => {
    return (
        <Page title="Главная">
            <Text variant="code-3"></Text>
        </Page>
    );
};

export const Route = createFileRoute('/')({
    component: lazyRouteComponent(() => import('./'), 'Index'),
    staticData: {
        crumb: 'Главная',
    },
});
