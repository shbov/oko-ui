import { useState } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Feedback/ErrorBoundary',
    component: ErrorBoundary,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// A component that will throw an error when a button is clicked
const ErrorTrigger = () => {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        throw new Error('This is a simulated error triggered by user action');
    }

    return (
        <div>
            <h3>Error Trigger Component</h3>
            <p>Click the button below to trigger an error:</p>
            <button onClick={() => setShouldError(true)}>Trigger Error</button>
        </div>
    );
};

// A component that demonstrates the ErrorBoundary with a reset button
const ErrorBoundaryDemo = () => {
    const [key, setKey] = useState(0);

    return (
        <div>
            <ErrorBoundary>
                <ErrorTrigger key={key} />
            </ErrorBoundary>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => setKey((prev) => prev + 1)}>
                    Reset Error Boundary
                </button>
            </div>
        </div>
    );
};

export const Default: Story = {
    args: {
        children: <div>Normal content without errors</div>,
    },
};

export const WithErrorTrigger: Story = {
    args: {
        children: <ErrorBoundaryDemo />,
    },
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates how the ErrorBoundary catches errors and can be reset. Click the "Trigger Error" button to see the error boundary in action, then click "Reset Error Boundary" to recover.',
            },
        },
    },
};
