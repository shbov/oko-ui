import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome to Index!</h3>
        </div>
    );
}
