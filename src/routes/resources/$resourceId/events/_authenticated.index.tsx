import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$resourceId/events/_authenticated/')({
    component: RouteComponent,
    staticData: {
        crumb: 'События',
    },
});

function RouteComponent() {
    return <div>Hello `/resources/$resourceId/events/`!</div>;
}
