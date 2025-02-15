import type { SwitchProps } from '@gravity-ui/uikit';
import type {
    DeepKeys,
    DeepValue,
    FieldApi,
    Validator,
} from '@tanstack/react-form';

export type SwitchFieldProps<
    TParentData,
    TName extends DeepKeys<TParentData>,
    TFieldValidator extends
        | Validator<DeepValue<TParentData, TName>, unknown>
        | undefined = undefined,
    TFormValidator extends
        | Validator<TParentData, unknown>
        | undefined = undefined,
    TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> = Omit<SwitchProps, 'value' | 'onBlur' | 'onFocus' | 'onUpdate'> & {
    field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;
};
