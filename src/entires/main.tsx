import * as React from 'react';

import { DataManagerContext } from '@gravity-ui/data-source';
import { ThemeProvider } from '@gravity-ui/uikit';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '~/components/ErrorBoundary';
import { ReactQueryDevtools } from '~/components/ReactQueryDevtools';
import { TanStackRouterDevtools } from '~/components/TanStackRouterDevtools';
import { dataManager } from '~/services/data-source';
import { router } from '~/services/router';
import '~/styles/index.scss';

import '../utils/configure';

const root = createRoot(document.getElementById('root')!);

const App = () => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={dataManager.queryClient}>
                <ReactQueryDevtools />
                <TanStackRouterDevtools
                    router={router}
                    initialIsOpen={false}
                    position="bottom-right"
                />
                <DataManagerContext.Provider value={dataManager}>
                    <ThemeProvider theme="light">
                        <ErrorBoundary>
                            <RouterProvider router={router} />
                        </ErrorBoundary>
                    </ThemeProvider>
                </DataManagerContext.Provider>
            </QueryClientProvider>
        </React.StrictMode>
    );
};

root.render(<App />);
