import { useCallback, useMemo } from 'react';

import {
    SegmentedRadioGroup,
    type SegmentedRadioGroupProps,
} from '@gravity-ui/uikit';

import type { SegmentedRadioGroupFieldProps } from './types';
import type { DeepKeys, DeepValue, Validator } from '@tanstack/react-form';

export const SegmentedRadioGroupField = <
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
}: SegmentedRadioGroupFieldProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
>) => {
    const onUpdate = useCallback(
        (checked: string) => {
            field.setValue(checked as TData);
        },
        [field],
    );

    const props = useMemo(
        () =>
            ({
                ...restProps,

                value: field.state.value as string,
                onBlur: field.handleBlur,
                onUpdate,
            }) satisfies SegmentedRadioGroupProps,
        [field.handleBlur, field.state.value, onUpdate, restProps],
    );

    return <SegmentedRadioGroup {...props} />;
};
