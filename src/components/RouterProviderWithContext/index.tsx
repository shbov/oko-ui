import { RouterProvider } from '@tanstack/react-router';

import { useAuth } from '~/hooks/useAuth';
import { router } from '~/services/router';

export const RouterProviderWithContext = () => {
    const auth = useAuth(router);

    return <RouterProvider router={router} context={{ auth }} />;
};
