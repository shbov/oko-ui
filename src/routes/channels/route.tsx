import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/channels')({
    loader: () => {
        return {
            crumb: 'Каналы оповещения',
        };
    },
});
