import type { SelectProps } from '@gravity-ui/uikit';
import type {
    DeepKeys,
    DeepValue,
    FieldApi,
    Validator,
} from '@tanstack/react-form';

export type SelectFieldProps<
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
    SelectProps,
    | 'value'
    | 'onBlur'
    | 'onFocus'
    | 'onUpdate'
    | 'errorMessage'
    | 'validationState'
> & {
    field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;
    isSingle?: boolean;
};
