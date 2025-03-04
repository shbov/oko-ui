import * as React from 'react';

import { FormRow } from '@gravity-ui/components';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { Form, TextField } from '~/packages/form';
import { toaster } from '~/services/toaster';
import { zod } from '~/services/zod';
import { emailSchema } from '~/utils/validation/schemas';

const restoreSchema = zod.object({
    email: emailSchema,
});

type FormValues = zod.infer<typeof restoreSchema>;

export const Restore = () => {
    const navigate = useNavigate();
    const onSubmit = React.useCallback(({ value }: { value: FormValues }) => {
        console.log('data', value);

        toaster.add({
            name: 'restore-success',
            title: 'Успешно',
            theme: 'success',
            content: 'Письмо отправлено на почту',
        });
    }, []);

    const form = useForm({
        onSubmit,
        validators: {
            onChange: restoreSchema,
        },
        defaultValues: {
            email: '',
        } as FormValues,
    });

    return (
        <Page title="Восстановление пароля">
            <Form
                submitText="Восстановить"
                formApi={form}
                size="m"
                aditionalButton={{
                    text: 'Войти в аккаунт',
                    view: 'flat',
                    action: () => {
                        void navigate({
                            to: '/auth/login',
                        });
                    },
                }}
            >
                <FormRow label="Почта">
                    <form.Field name="email">
                        {(field) => (
                            <TextField
                                type="email"
                                placeholder="example@edu.hse.ru"
                                field={field}
                            />
                        )}
                    </form.Field>
                </FormRow>
            </Form>
        </Page>
    );
};

export const Route = createFileRoute('/auth/restore')({
    component: Restore,
    staticData: {
        crumb: 'Восстановление пароля',
    },
});
