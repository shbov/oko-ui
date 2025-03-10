import { useCallback } from 'react';

import { cn } from '@bem-react/classname';
import { Button, Flex } from '@gravity-ui/uikit';
import { useRouter } from '@tanstack/react-router';

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
    aditionalButton,
    withCancelButton,
}: FormProps<TFormData, TFormValidator>) => {
    const router = useRouter();

    const additionalButtonAction = useCallback(() => {
        if (aditionalButton?.action) {
            aditionalButton.action();
        }
    }, [aditionalButton]);

    const cancelButtonAction = useCallback(() => {
        router.history.back();
    }, [router.history]);

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
                    <Flex gap="2">
                        <Button
                            view="action"
                            type="submit"
                            disabled={!canSubmit}
                            loading={isSubmitting}
                        >
                            {submitText}
                        </Button>

                        {withCancelButton && (
                            <Button view="normal" onClick={cancelButtonAction}>
                                Отменить
                            </Button>
                        )}

                        {aditionalButton && (
                            <Button
                                view={aditionalButton.view}
                                onClick={additionalButtonAction}
                            >
                                {aditionalButton.text}
                            </Button>
                        )}
                    </Flex>
                )}
            </formApi.Subscribe>
        </form>
    );
};
