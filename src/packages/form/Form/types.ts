import type * as React from 'react';

import type { ReactFormExtendedApi, Validator } from '@tanstack/react-form';

export interface FormProps<
    TFormData,
    TFormValidator extends
        | undefined
        | Validator<TFormData, unknown> = undefined,
> {
    submitText: string;
    children: React.ReactNode;
    formApi: ReactFormExtendedApi<TFormData, TFormValidator>;
    className?: string;
    size?: 's' | 'm' | 'l';
}
