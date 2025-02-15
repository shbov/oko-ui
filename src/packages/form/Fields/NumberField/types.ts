import type { NumberInputProps } from '@gravity-ui/uikit';
import type {
    DeepKeys,
    DeepValue,
    FieldApi,
    Validator,
} from '@tanstack/react-form';

export type NumberFieldProps<
    TParentData,
    TName extends DeepKeys<TParentData>,
    TFieldValidator extends
        | Validator<DeepValue<TParentData, TName>, unknown>
        | undefined = undefined,
    TFormValidator extends
        | Validator<TParentData, unknown>
        | undefined = undefined,
    TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> = Omit<
    NumberInputProps,
    | 'value'
    | 'onBlur'
    | 'onFocus'
    | 'onUpdate'
    | 'errorMessage'
    | 'validationState'
> & {
    field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;
};
