import { useCallback, useMemo } from 'react';

import { DatePicker, type DatePickerProps } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';

import { getErrorMessage } from '~/utils/validation';

import type { DatePickerFieldProps } from './types';
import type { DateTime, DateTimeInput } from '@gravity-ui/date-utils';
import type { DeepKeys, DeepValue, Validator } from '@tanstack/react-form';

export const DatePickerField = <
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
}: DatePickerFieldProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
>) => {
    const onChange = useCallback(
        (value: DateTime | null) => {
            field.setValue(value?.toDate() as TData);
        },
        [field],
    );

    const errorMessage = useMemo(
        () =>
            field.state.meta.isTouched &&
            getErrorMessage(field.state.meta.errors),
        [field.state.meta.errors, field.state.meta.isTouched],
    );

    const value = useMemo(() => {
        return dateTimeParse(field.state.value as DateTimeInput);
    }, [field.state.value]);

    const props = useMemo(
        () =>
            ({
                ...restProps,

                value,
                onBlur: field.handleBlur,
                onUpdate: onChange,
                errorMessage: errorMessage || undefined,
                validationState: errorMessage ? 'invalid' : undefined,
            }) satisfies DatePickerProps,
        [errorMessage, field.handleBlur, onChange, restProps, value],
    );

    return <DatePicker {...props} />;
};
