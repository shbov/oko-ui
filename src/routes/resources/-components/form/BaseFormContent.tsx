import { Fragment, useMemo } from 'react';

import { FormRow } from '@gravity-ui/components';
import { Flex, HelpMark, Text } from '@gravity-ui/uikit';
import { type ReactFormExtendedApi } from '@tanstack/react-form';
import block from 'bem-cn-lite';
import { groupBy } from 'lodash';

import {
    TextField,
    TextAreaField,
    SelectField,
    DatePickerField,
} from '~/packages/form';
import type { Channel } from '~/services/api/notification';

import './BaseFormContent.scss';
import { ScreenshotSection } from './components/ScreenshotSection';

import type { CommonFormValues } from './types';

const b = block('base-form-content');

const transformChannels = (channels: Channel[]) => {
    const uniqueTypes = new Set(channels.map((channel) => channel.type));
    const groupedChannels = groupBy(channels, 'type');

    if (uniqueTypes.size > 1) {
        return Object.entries(groupedChannels).map(([type, items]) => ({
            label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            options: items.map((channel) => ({
                value: channel.id,
                content: channel.name ?? channel.id,
            })),
        }));
    }

    return channels.map((channel) => ({
        value: channel.id,
        content: channel.name ?? channel.id,
    }));
};

export const BaseFormContent = ({
    form,
    channels,
    mode,
}: {
    form: ReactFormExtendedApi<CommonFormValues, undefined>;
    channels: Channel[];
    mode: 'create' | 'edit';
}) => {
    const options = useMemo(() => {
        return transformChannels(channels);
    }, [channels]);

    return (
        <Fragment>
            <FormRow label="Название" required>
                <form.Field name="name">
                    {(field) => <TextField type="text" field={field} />}
                </form.Field>
            </FormRow>

            <FormRow label="Описание">
                <form.Field name="description">
                    {(field) => <TextAreaField field={field} minRows={2} />}
                </form.Field>
            </FormRow>

            <FormRow label="URL" required>
                <form.Field name="url">
                    {(field) => (
                        <TextField
                            type="url"
                            placeholder="https://example.com"
                            field={field}
                            disabled={mode === 'edit'}
                        />
                    )}
                </form.Field>
            </FormRow>

            <FormRow
                label="Ключевые слова"
                labelHelpPopover={
                    <HelpMark
                        popoverProps={{
                            className: b('help-mark'),
                        }}
                    >
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

            <FormRow
                label="Начать проверку"
                required
                labelHelpPopover={
                    <HelpMark
                        popoverProps={{
                            className: b('help-mark'),
                        }}
                    >
                        Введите дату, начиная с которой будет осуществляться
                        проверка ресурса. Если указана сегодняшняя дата, то
                        проверка будет осуществлена сразу.
                    </HelpMark>
                }
            >
                <form.Field name="startDate">
                    {(field) => <DatePickerField field={field} />}
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

            <ScreenshotSection form={form} />
        </Fragment>
    );
};
