import { useForm } from '@tanstack/react-form';

import { Form } from '~/packages/form';
import { t } from '~/services/i18n';

import { editSchema } from '../constants';
import { BaseFormContent } from './BaseFormContent';

import type { EditFormValues } from '../constants';

interface EditFormProps {
    initialValues: EditFormValues;
    onSubmit: ({ value }: { value: EditFormValues }) => void;
}

export const EditForm = ({ initialValues, onSubmit }: EditFormProps) => {
    const form = useForm<EditFormValues>({
        defaultValues: initialValues,
        onSubmit,
        validators: {
            onChange: editSchema,
        },
    });

    return (
        <Form
            submitText={t('resources.form.save')}
            formApi={form}
            size="m"
            withCancelButton
        >
            <BaseFormContent form={form} mode="edit" />
        </Form>
    );
};
