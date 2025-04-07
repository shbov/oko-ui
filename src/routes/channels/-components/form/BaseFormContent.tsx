import { Fragment } from 'react';

import { FormRow } from '@gravity-ui/components';

import { TextField, SelectField, TextAreaField } from '~/packages/form/Fields';
import { ChannelType } from '~/services/api/notification';

import type { BaseFormValues } from '../constants';
import type { SelectOption } from '@gravity-ui/uikit';
import type { useForm } from '@tanstack/react-form';

const typeOptions: SelectOption[] = [
    {
        value: ChannelType.Telegram,
        content: 'Telegram',
    },
    {
        value: ChannelType.Email,
        content: 'Email',
    },
];

interface BaseFormContentProps {
    form: ReturnType<typeof useForm<BaseFormValues>>;
}

export const BaseFormContent = ({ form }: BaseFormContentProps) => {
    return (
        <Fragment>
            <FormRow label="Название" required>
                <form.Field name="name">
                    {(field) => (
                        <TextField
                            field={field}
                            placeholder="Введите название канала"
                        />
                    )}
                </form.Field>
            </FormRow>

            <FormRow label="Тип" required>
                <form.Field name="type">
                    {(field) => (
                        <SelectField
                            field={field}
                            options={typeOptions}
                            placeholder="Выберите тип канала"
                        />
                    )}
                </form.Field>
            </FormRow>

            <FormRow label="Параметры" required>
                <form.Field name="params">
                    {(field) => (
                        <TextAreaField
                            field={field}
                            placeholder="Введите параметры в формате JSON"
                            minRows={3}
                        />
                    )}
                </form.Field>
            </FormRow>
        </Fragment>
    );
};
