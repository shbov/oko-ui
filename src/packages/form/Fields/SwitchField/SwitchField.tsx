import * as React from 'react';

import { Switch, type SwitchProps } from '@gravity-ui/uikit';

import type { SwitchFieldProps } from './types';
import type { DeepKeys, DeepValue, Validator } from '@tanstack/react-form';

export const SwitchField = <
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
}: SwitchFieldProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
>) => {
    const onChange = React.useCallback(
        (checked: boolean) => {
            field.setValue(checked as TData);
        },
        [field],
    );

    const props = React.useMemo(
        () =>
            ({
                ...restProps,
                value: field.state.value as string,
                onBlur: field.handleBlur,
                onUpdate: onChange,
            }) satisfies SwitchProps,
        [field.handleBlur, field.state.value, onChange, restProps],
    );

    return <Switch {...props} />;
};
