import * as React from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/home')({
    component: Home,
});

function Home() {
    return <React.Fragment>Home, sweet home</React.Fragment>;
}
