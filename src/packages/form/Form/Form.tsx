import { cn } from '@bem-react/classname';
import { Button } from '@gravity-ui/uikit';

import './Form.scss';

import type { FormProps } from './types';
import type { Validator } from '@tanstack/react-form';

const b = cn('app-form');

export const Form = <
    TFormData,
    TFormValidator extends
        | undefined
        | Validator<TFormData, unknown> = undefined,
>({
    children,
    submitText,
    formApi,
    className,
    size,
}: FormProps<TFormData, TFormValidator>) => {
    return (
        <form
            className={b({ size }, className)}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                void formApi.handleSubmit();
            }}
        >
            {children}

            <formApi.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
                {([canSubmit, isSubmitting]) => (
                    <Button
                        view="action"
                        type="submit"
                        disabled={!canSubmit}
                        loading={isSubmitting}
                    >
                        {submitText}
                    </Button>
                )}
            </formApi.Subscribe>
        </form>
    );
};
