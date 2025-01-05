import * as React from 'react';

import { FaceRobot } from '@gravity-ui/icons';
import { NotFound as NotFoundImage } from '@gravity-ui/illustrations';
import { AsideHeader } from '@gravity-ui/navigation';
import {
    createRootRouteWithContext,
    Outlet,
    useNavigate,
} from '@tanstack/react-router';

import { ErrorContainer } from '~/components/ErrorContainer';

const App = () => {
    const [compact, setCompact] = React.useState(true);
    const navigate = useNavigate();

    return (
        <AsideHeader
            compact={compact}
            renderContent={() => <Outlet />}
            onChangeCompact={setCompact}
            multipleTooltip
            logo={{
                text: 'Oko',
                icon: FaceRobot,
                onClick: () => {
                    void navigate({
                        to: '/',
                    });
                },
            }}
        />
    );
};

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <ErrorContainer
            title="Страница не найдена"
            description={''}
            image={<NotFoundImage />}
            actions={[
                {
                    text: 'Вернуться на главную',
                    onClick: () => {
                        void navigate({
                            to: '/',
                        });
                    },
                },
            ]}
        />
    );
};

export const Route = createRootRouteWithContext()({
    component: App,
    notFoundComponent: NotFound,
});
