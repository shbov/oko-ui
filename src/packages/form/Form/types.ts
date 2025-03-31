import type { ReactNode } from 'react';

import type { ButtonProps } from '@gravity-ui/uikit';
import type { ReactFormExtendedApi, Validator } from '@tanstack/react-form';

export interface FormProps<
    TFormData,
    TFormValidator extends
        | undefined
        | Validator<TFormData, unknown> = undefined,
> {
    submitText: string;
    children: ReactNode;
    formApi: ReactFormExtendedApi<TFormData, TFormValidator>;
    className?: string;
    size?: 's' | 'm' | 'l';
    withCancelButton?: boolean;
    additionalButton?: {
        text?: string;
        view?: ButtonProps['view'];
        action?: () => void;
    };
}
