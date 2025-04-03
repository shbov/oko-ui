import { useCallback } from 'react';

import { FormRow } from '@gravity-ui/components';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useApiError } from '~/hooks/toasters';
import { Form, TextField } from '~/packages/form';
import { api } from '~/services/api';
import { toaster } from '~/services/toaster';
import { zod } from '~/services/zod';
import { emailSchema } from '~/utils/validation/schemas';

const restoreSchema = zod.object({
    email: emailSchema,
});

type FormValues = zod.infer<typeof restoreSchema>;

export const Restore = () => {
    const navigate = useNavigate();
    const handleError = useApiError();

    const onSubmit = useCallback(
        ({ value }: { value: FormValues }) => {
            api.user
                .restorePassword(value)
                .then(() => {
                    toaster.add({
                        name: 'restore-success',
                        title: 'Успешно',
                        theme: 'success',
                        content: 'Письмо отправлено на почту',
                    });
                })
                .catch(handleError);
        },
        [handleError],
    );

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
                additionalButton={{
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

export const Route = createFileRoute('/auth/_auth/restore')({
    component: Restore,
    loader: () => {
        return {
            crumb: 'Восстановление пароля',
        };
    },
});
