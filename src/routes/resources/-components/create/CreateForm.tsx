import { useForm } from '@tanstack/react-form';

import { ZoneType } from '~/api/resource';
import { Form } from '~/packages/form';

import { CreateFormContent } from './CreateFormContent';
import { createSchema, type FormValues } from '../constants';

import type { CreateFormProps } from './types';

export const CreateForm = ({ onSubmit }: CreateFormProps) => {
    const form = useForm({
        onSubmit,
        validators: {
            onChange: createSchema,
        },
        defaultValues: {
            name: '',
            url: '',
            description: '',
            sensitivity: 1,
            keywords: '',
            isScreenshot: false,
            zoneType: ZoneType.fullPage,
            areas: [],
            channels: [],
        } as FormValues,
    });

    return (
        <Form submitText="Создать" formApi={form} size="m" withCancelButton>
            <CreateFormContent form={form} />
        </Form>
    );
};
