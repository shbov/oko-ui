import * as React from 'react';

import { Select } from '@gravity-ui/uikit';

import { getErrorMessage } from '~/utils/validation';

import type { SelectFieldProps } from './types';
import type { SelectProps } from '@gravity-ui/uikit';
import type { DeepKeys, DeepValue, Validator } from '@tanstack/react-form';

export const SelectField = <
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
}: SelectFieldProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
>) => {
    const onChange = React.useCallback(
        (e: string[]) => {
            field.setValue(e as TData);
        },
        [field],
    );

    const errorMessage = React.useMemo(
        () =>
            field.state.meta.isTouched
            && getErrorMessage(field.state.meta.errors),
        [field.state.meta.errors, field.state.meta.isTouched],
    );

    const props = React.useMemo(
        () =>
            ({
                ...restProps,

                value: field.state.value as string[],
                onBlur: field.handleBlur,
                onUpdate: onChange,
                errorMessage: errorMessage || undefined,
                validationState: errorMessage ? 'invalid' : undefined,
            }) satisfies SelectProps,
        [
            errorMessage,
            field.handleBlur,
            field.state.value,
            onChange,
            restProps,
        ],
    );

    return <Select {...props} />;
};
