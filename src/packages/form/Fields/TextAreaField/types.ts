import type { TextAreaProps } from '@gravity-ui/uikit';
import type {
    DeepKeys,
    DeepValue,
    FieldApi,
    Validator,
} from '@tanstack/react-form';

export type TextAreaFieldProps<
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
    TextAreaProps,
    | 'value'
    | 'onBlur'
    | 'onFocus'
    | 'onUpdate'
    | 'errorMessage'
    | 'validationState'
> & {
    field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;
};
