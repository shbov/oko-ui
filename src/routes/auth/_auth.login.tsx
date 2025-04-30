import { useCallback } from 'react';

import { FormRow } from '@gravity-ui/components';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useLoginMutation } from '~/hooks/useAuth';
import { Form, TextField } from '~/packages/form';
import { t } from '~/services/i18n';
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
        <Page title={t('auth.login')}>
            <Form
                submitText={t('auth.login')}
                formApi={form}
                size="m"
                additionalButton={{
                    text: t('auth.forgotPassword'),
                    view: 'flat',
                    action: () => {
                        void navigate({
                            to: '/auth/restore',
                        });
                    },
                }}
            >
                <FormRow label={t('auth.email')}>
                    <form.Field name="email">
                        {(field) => (
                            <TextField
                                type="email"
                                placeholder={t('auth.emailPlaceholder')}
                                field={field}
                            />
                        )}
                    </form.Field>
                </FormRow>

                <FormRow label={t('auth.password')}>
                    <form.Field name="password">
                        {(field) => (
                            <TextField
                                type="password"
                                placeholder={t('auth.passwordPlaceholder')}
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
            crumb: t('auth.login'),
        };
    },
});
