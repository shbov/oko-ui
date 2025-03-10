import { Fragment } from 'react';

import { Outlet } from '@tanstack/react-router';

import { Breadcrumbs } from '~/components/AppLayout/Breadcrumbs';
import { Footer } from '~/components/AppLayout/Footer';
import { Meta } from '~/components/AppLayout/Meta';

export const AppLayout = () => {
    return (
        <Fragment>
            <Breadcrumbs />

            <Meta>
                <Outlet />
            </Meta>

            <Footer />
        </Fragment>
    );
};
