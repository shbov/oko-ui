import * as React from 'react';

import { PasswordInput } from '@gravity-ui/uikit';
import { TextInput, type TextInputProps } from '@gravity-ui/uikit';

import { isStringNumber } from '~/utils/checks';
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
    const onChange = React.useCallback(
        (e: string) => {
            if (isStringNumber(e) && restProps.type === 'number') {
                field.setValue(Number(e) as TData);
            } else {
                field.setValue(e as TData);
            }
        },
        [field, restProps.type],
    );

    const errorMessage = React.useMemo(
        () =>
            field.state.meta.isTouched &&
            getErrorMessage(field.state.meta.errors),
        [field.state.meta.errors, field.state.meta.isTouched],
    );

    const props = React.useMemo(
        () =>
            ({
                hasClear: true,
                ...restProps,
                value: `${field.state.value as unknown as string}`, // TODO(@shbov): think about typing here
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
