/* eslint-disable @stylistic/jsx-wrap-multilines */
import * as React from 'react';

import { FormRow } from '@gravity-ui/components';
import { Flex, HelpMark, Text } from '@gravity-ui/uikit';
import { type ReactFormExtendedApi } from '@tanstack/react-form';
import block from 'bem-cn-lite';
import { groupBy } from 'lodash';

import type { Channel } from '~/api/notification';
import { TextField, TextAreaField, SelectField } from '~/packages/form';
import { ScreenshotSection } from '~/routes/resources/-components/create/components/ScreenshotSection';

import './CreateFormContent.scss';

import type { FormValues } from '../constants';

const b = block('create-form-content');

const transformChannels = (channels: Channel[]) => {
    const groupedChannels = groupBy(channels, 'type');

    return Object.entries(groupedChannels).map(([type, items]) => ({
        label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
        options: items.map((channel) => ({
            value: channel.id,
            content: channel.name,
        })),
    }));
};

export const CreateFormContent = ({
    form,
    channels,
}: {
    form: ReactFormExtendedApi<FormValues, undefined>;
    channels: Channel[];
}) => {
    const options = React.useMemo(() => {
        return transformChannels(channels);
    }, [channels]);

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
                labelHelpPopover={
                    <HelpMark>
                        Ключевые слова не чувствительные к регистру и должны
                        быть разделены запятой
                    </HelpMark>
                }
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
                            filterable
                            options={options}
                        />
                    )}
                </form.Field>
            </FormRow>

            <FormRow label="Интервал проверки" required>
                <Flex gap={2}>
                    <form.Field name="interval.minutes">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">Минуты</Text>
                                <TextField
                                    field={field}
                                    placeholder="*"
                                    errorPlacement="inside"
                                    className={b('cron-input')}
                                />
                            </Flex>
                        )}
                    </form.Field>
                    <form.Field name="interval.hours">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">Часы</Text>
                                <TextField
                                    field={field}
                                    placeholder="*"
                                    errorPlacement="inside"
                                    className={b('cron-input')}
                                />
                            </Flex>
                        )}
                    </form.Field>
                    <form.Field name="interval.days">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">Дни</Text>
                                <TextField
                                    field={field}
                                    placeholder="*"
                                    errorPlacement="inside"
                                    className={b('cron-input')}
                                />
                            </Flex>
                        )}
                    </form.Field>
                    <form.Field name="interval.months">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">Месяцы</Text>
                                <TextField
                                    field={field}
                                    placeholder="*"
                                    errorPlacement="inside"
                                    className={b('cron-input')}
                                />
                            </Flex>
                        )}
                    </form.Field>
                    <form.Field name="interval.dayOfWeek">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">День недели</Text>
                                <TextField
                                    field={field}
                                    placeholder="*"
                                    errorPlacement="inside"
                                    className={b('cron-input')}
                                />
                            </Flex>
                        )}
                    </form.Field>
                </Flex>
            </FormRow>
        </React.Fragment>
    );
};
