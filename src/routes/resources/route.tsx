import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources')({
    loader: () => {
        return {
            crumb: 'Ресурсы',
        };
    },
});
