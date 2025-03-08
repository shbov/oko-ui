import { Text } from '@gravity-ui/uikit';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useAuth } from '~/hooks/useAuth';

export const Index = () => {
    const router = useRouter();
    const auth = useAuth(router);

    return (
        <Page title="Главная">
            <Text variant="code-3">
                Welcome
                {' '}
                {auth.user?.name || 'Guest'}
            </Text>

        </Page>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
    staticData: {
        crumb: 'Главная',
    },
});
