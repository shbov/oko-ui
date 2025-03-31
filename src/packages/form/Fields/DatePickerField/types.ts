import type { DatePickerProps } from '@gravity-ui/date-components';
import type {
    DeepKeys,
    DeepValue,
    FieldApi,
    Validator,
} from '@tanstack/react-form';

export type DatePickerFieldProps<
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
    DatePickerProps,
    | 'value'
    | 'onBlur'
    | 'onFocus'
    | 'onUpdate'
    | 'errorMessage'
    | 'validationState'
> & {
    field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;
};
