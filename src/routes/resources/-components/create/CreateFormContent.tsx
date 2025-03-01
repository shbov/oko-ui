import * as React from 'react';

import { FormRow } from '@gravity-ui/components';
import { HelpMark } from '@gravity-ui/uikit';
import { type ReactFormExtendedApi } from '@tanstack/react-form';

import { TextField, TextAreaField, SelectField } from '~/packages/form';
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

            <FormRow label="Описание">
                <form.Field name="description">
                    {(field) => <TextAreaField field={field} rows={2} />}
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

            <FormRow
                label="Ключевые слова"
                labelHelpPopover={(
                    <HelpMark>
                        Ключевые слова не чувствительные к регистру и должны
                        быть разделены запятой
                    </HelpMark>
                )}
            >
                <form.Field name="keywords">
                    {(field) => (
                        <TextAreaField
                            field={field}
                            placeholder="keyword1, keyword2"
                        />
                    )}
                </form.Field>
            </FormRow>

            <FormRow label="Канал оповещения" required>
                <form.Field name="channels">
                    {(field) => (
                        <SelectField
                            field={field}
                            multiple
                            options={[
                                {
                                    content: 'E-mail',
                                    value: 'email',
                                },
                                {
                                    content: 'Telegram',
                                    value: 'telegram',
                                },
                            ]}
                        />
                    )}
                </form.Field>
            </FormRow>
        </React.Fragment>
    );
};
