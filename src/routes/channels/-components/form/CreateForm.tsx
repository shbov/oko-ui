import { useForm } from '@tanstack/react-form';

import { Form } from '~/packages/form';
import { ChannelType } from '~/services/api/notification';

import { createSchema } from '../constants';
import { BaseFormContent } from './BaseFormContent';

import type { CreateFormValues } from '../constants';

interface CreateFormProps {
    onSubmit: ({ value }: { value: CreateFormValues }) => void;
}

export const CreateForm = ({ onSubmit }: CreateFormProps) => {
    const form = useForm<CreateFormValues>({
        defaultValues: {
            name: '',
            type: ChannelType.Telegram,
            chatId: '',
            email: '',
        },
        onSubmit,
        validators: {
            onChange: createSchema,
        },
    });

    return (
        <Form submitText="Создать" formApi={form} size="m" withCancelButton>
            <BaseFormContent form={form} mode="create" />
        </Form>
    );
};
