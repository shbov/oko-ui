import type { ValidationError } from '@tanstack/react-form';

export const getErrorMessage = (errors: ValidationError[]) => {
    const firstError = errors[0];
    if (typeof firstError === 'string') {
        return firstError.split(', ')[0];
    }

    return undefined;
};
