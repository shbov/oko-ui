import { Fragment } from 'react';

import { FormRow } from '@gravity-ui/components';
import { HelpMark, type SelectOption } from '@gravity-ui/uikit';
import { useStore, type useForm } from '@tanstack/react-form';

import { TextField, SelectField } from '~/packages/form/Fields';
import { ChannelType } from '~/services/api/notification';

import type { BaseFormValues } from '../constants';

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
                <FormRow
                    label="Чат(ы) ID"
                    required
                    labelHelpPopover={
                        <HelpMark>
                            Введите ID чата. Если нужно добавить несколько
                            чатов, введите их через запятую.
                        </HelpMark>
                    }
                >
                    <form.Field name="chatId">
                        {(field) => (
                            <TextField
                                field={field}
                                placeholder="123, 456, 789"
                                hasClear
                            />
                        )}
                    </form.Field>
                </FormRow>
            )}

            {type === ChannelType.Email && (
                <FormRow
                    label="Email"
                    required
                    labelHelpPopover={
                        <HelpMark>
                            Введите email. Если нужно добавить несколько email,
                            введите их через запятую.
                        </HelpMark>
                    }
                >
                    <form.Field name="email">
                        {(field) => (
                            <TextField
                                field={field}
                                placeholder="test@test.com, test2@test.com"
                                hasClear
                            />
                        )}
                    </form.Field>
                </FormRow>
            )}
        </Fragment>
    );
};
