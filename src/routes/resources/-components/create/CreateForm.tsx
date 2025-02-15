import { useForm } from '@tanstack/react-form';

import { Form } from '~/packages/form';

import { CreateFormContent } from './CreateFormContent';
import { createSchema, ZoneType } from '../constants';

import type { CreateFormProps } from './types';
import type { FormValues } from '../constants';

export const CreateForm = ({ onSubmit }: CreateFormProps) => {
    const form = useForm({
        onSubmit,
        validators: {
            onChange: createSchema,
        },
        defaultValues: {
            name: '',
            url: '',
            sensitivity: 1,
            isScreenshot: false,
            zoneType: ZoneType.fullPage,
            areas: [],
        } as FormValues,
    });

    return (
        <Form submitText="Создать" formApi={form} size="m">
            <CreateFormContent form={form} />
        </Form>
    );
};
