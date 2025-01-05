import * as React from 'react';

import { ErrorContainer } from '../ErrorContainer';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error) {
        this.setState({
            error,
        });
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    render(): React.ReactNode {
        const { hasError, error } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <ErrorContainer
                    title={error?.name}
                    description={error?.message}
                />
            );
        }

        return children;
    }
}