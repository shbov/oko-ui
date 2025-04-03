import { useCallback } from 'react';

import { FormRow } from '@gravity-ui/components';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useLoginMutation } from '~/hooks/useAuth';
import { Form, TextField } from '~/packages/form';
import { zod } from '~/services/zod';
import { emailSchema, passwordSchema } from '~/utils/validation/schemas';

const loginSchema = zod.object({
    email: emailSchema,
    password: passwordSchema,
});

type FormValues = zod.infer<typeof loginSchema>;

export const Login = () => {
    const navigate = useNavigate();
    const { mutateAsync: loginUser } = useLoginMutation();

    const onSubmit = useCallback(
        async ({ value }: { value: FormValues }) => {
            await loginUser(value);
        },
        [loginUser],
    );

    const form = useForm({
        onSubmit,
        validators: {
            onChange: loginSchema,
        },
        defaultValues: {
            email: '',
            password: '',
        } as FormValues,
    });

    return (
        <Page title="Авторизация">
            <Form
                submitText="Войти"
                formApi={form}
                size="m"
                additionalButton={{
                    text: 'Восстановить пароль',
                    view: 'flat',
                    action: () => {
                        void navigate({
                            to: '/auth/restore',
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

                <FormRow label="Пароль">
                    <form.Field name="password">
                        {(field) => (
                            <TextField
                                type="password"
                                placeholder="Введите ваш пароль"
                                field={field}
                            />
                        )}
                    </form.Field>
                </FormRow>
            </Form>
        </Page>
    );
};

export const Route = createFileRoute('/auth/_auth/login')({
    component: Login,
    loader: () => {
        return {
            crumb: 'Авторизация',
        };
    },
});
