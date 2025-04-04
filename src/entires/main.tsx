import { StrictMode } from 'react';

import { DataManagerContext } from '@gravity-ui/data-source';
import {
    ThemeProvider,
    ToasterComponent,
    ToasterProvider,
} from '@gravity-ui/uikit';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { PageActionsProvider } from '~/components/AppLayout/PageActionsContext';
import { ErrorBoundary } from '~/components/ErrorBoundary';
import { ReactQueryDevtools } from '~/components/ReactQueryDevtools';
import { RouterProviderWithContext } from '~/components/RouterProviderWithContext';
import { TanStackRouterDevtools } from '~/components/TanStackRouterDevtools';
import { dataManager } from '~/services/data-source';
import { router } from '~/services/router';
import { toaster } from '~/services/toaster';
import '~/styles/index.scss';

import '../utils/configure';

const root = createRoot(document.getElementById('root')!);

const App = () => {
    return (
        <StrictMode>
            <QueryClientProvider client={dataManager.queryClient}>
                <PageActionsProvider>
                    <ReactQueryDevtools />
                    <TanStackRouterDevtools
                        router={router}
                        initialIsOpen={false}
                        position="bottom-right"
                    />
                    <DataManagerContext.Provider value={dataManager}>
                        <ThemeProvider theme="dark">
                            <ToasterProvider toaster={toaster}>
                                <ErrorBoundary>
                                    <RouterProviderWithContext />
                                </ErrorBoundary>
                                <ToasterComponent />
                            </ToasterProvider>
                        </ThemeProvider>
                    </DataManagerContext.Provider>
                </PageActionsProvider>
            </QueryClientProvider>
        </StrictMode>
    );
};

root.render(<App />);
