import { Fragment } from 'react';

import { FormRow } from '@gravity-ui/components';
import { useStore, type useForm } from '@tanstack/react-form';

import { TextField, SelectField } from '~/packages/form/Fields';
import { ChannelType } from '~/services/api/notification';

import type { BaseFormValues } from '../constants';
import type { SelectOption } from '@gravity-ui/uikit';

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
    mode: 'create' | 'edit';
}

export const BaseFormContent = ({ form, mode }: BaseFormContentProps) => {
    const type = useStore(form.store, (state) => state.values.type);

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

            <FormRow label="Тип">
                <form.Field name="type">
                    {(field) => (
                        <SelectField
                            field={field}
                            options={typeOptions}
                            placeholder="Выберите тип канала"
                            isSingle
                            disabled={mode === 'edit'}
                        />
                    )}
                </form.Field>
            </FormRow>
            {type === ChannelType.Telegram && (
                <FormRow label="Чат ID" required>
                    <form.Field name="chatId">
                        {(field) => (
                            <TextField
                                field={field}
                                placeholder="Введите ID чата"
                                hasClear
                            />
                        )}
                    </form.Field>
                </FormRow>
            )}

            {type === ChannelType.Email && (
                <FormRow label="Email" required>
                    <form.Field name="email">
                        {(field) => (
                            <TextField
                                field={field}
                                placeholder="Введите email"
                                hasClear
                            />
                        )}
                    </form.Field>
                </FormRow>
            )}
        </Fragment>
    );
};
