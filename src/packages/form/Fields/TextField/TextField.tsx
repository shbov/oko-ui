import { useCallback, useMemo } from 'react';

import { PasswordInput } from '@gravity-ui/uikit';
import { TextInput, type TextInputProps } from '@gravity-ui/uikit';

import { getErrorMessage } from '~/utils/validation';

import type { TextFieldProps } from './types';
import type { DeepKeys, DeepValue, Validator } from '@tanstack/react-form';

export const TextField = <
    TParentData,
    TName extends DeepKeys<TParentData>,
    TFieldValidator extends
        | Validator<DeepValue<TParentData, TName>, unknown>
        | undefined = undefined,
    TFormValidator extends
        | Validator<TParentData, unknown>
        | undefined = undefined,
    TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>({
    field,
    ...restProps
}: TextFieldProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
>) => {
    const onChange = useCallback(
        (e: string) => {
            field.setValue(e as TData);
        },
        [field],
    );

    const errorMessage = useMemo(
        () =>
            field.state.meta.isTouched &&
            getErrorMessage(field.state.meta.errors),
        [field.state.meta.errors, field.state.meta.isTouched],
    );

    const props = useMemo(
        () =>
            ({
                hasClear: true,
                ...restProps,

                value: `${field.state.value as string}`,
                onBlur: field.handleBlur,
                onUpdate: onChange,
                errorMessage: errorMessage || undefined,
                validationState: errorMessage ? 'invalid' : undefined,
            }) satisfies TextInputProps,
        [
            errorMessage,
            field.handleBlur,
            field.state.value,
            onChange,
            restProps,
        ],
    );

    if (restProps.type === 'password') {
        return <PasswordInput {...props} autoComplete="new-password" />;
    }

    return <TextInput {...props} />;
};
