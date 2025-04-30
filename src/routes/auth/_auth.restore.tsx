import { useCallback } from 'react';

import { FormRow } from '@gravity-ui/components';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Page } from '~/components/Page';
import { useApiError } from '~/hooks/toasters';
import { Form, TextField } from '~/packages/form';
import { api } from '~/services/api';
import { t } from '~/services/i18n';
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
        <Page title={t('auth.restore')}>
            <Form
                submitText={t('auth.restoreButton')}
                formApi={form}
                size="m"
                additionalButton={{
                    text: t('auth.login'),
                    view: 'flat',
                    action: () => {
                        void navigate({
                            to: '/auth/login',
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
            </Form>
        </Page>
    );
};

export const Route = createFileRoute('/auth/_auth/restore')({
    component: Restore,
    loader: () => {
        return {
            crumb: t('auth.restore'),
        };
    },
});
