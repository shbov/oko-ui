import { NotFound as NotFoundImage } from '@gravity-ui/illustrations';
import { useNavigate } from '@tanstack/react-router';

import { ErrorContainer } from '~/components/ErrorContainer';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <ErrorContainer
            title="Страница не найдена"
            description=""
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
