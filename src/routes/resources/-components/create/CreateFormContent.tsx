import * as React from 'react';

import { FormRow } from '@gravity-ui/components';
import { type ReactFormExtendedApi } from '@tanstack/react-form';

import { TextField } from '~/packages/form';
import { ScreenshotSection } from '~/routes/resources/-components/create/components/ScreenshotSection';

import type { FormValues } from '../constants';

export const CreateFormContent = ({
    form,
}: {
    form: ReactFormExtendedApi<FormValues, undefined>;
}) => {
    return (
        <React.Fragment>
            <FormRow label="Название" required>
                <form.Field name="name">
                    {(field) => <TextField type="text" field={field} />}
                </form.Field>
            </FormRow>

            <FormRow label="URL" required>
                <form.Field name="url">
                    {(field) => (
                        <TextField
                            type="url"
                            placeholder="https://example.com"
                            field={field}
                        />
                    )}
                </form.Field>
            </FormRow>

            <ScreenshotSection form={form} />
        </React.Fragment>
    );
};
