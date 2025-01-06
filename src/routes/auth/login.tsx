import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/Page';

export const Login = () => {
    return <Page title="Авторизация">Hello &#34;/login&#34;!</Page>;
};

export const Route = createFileRoute('/auth/login')({
    component: Login,
    staticData: {
        crumb: 'Авторизация',
    },
});
