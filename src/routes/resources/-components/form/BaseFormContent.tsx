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
import { t } from '~/services/i18n';

import './BaseFormContent.scss';
import { ScreenshotSection } from './components/ScreenshotSection';

import type { CommonFormValues } from './types';

const b = block('base-form-content');

const transformChannels = (channels: Channel[], channelsIds: string[]) => {
    const uniqueTypes = new Set(channels.map((channel) => channel.type));
    const groupedChannels = groupBy(channels, 'type');

    // Add missing channel IDs as individual entries
    const missingChannelIds = channelsIds.filter(
        (id) => !channels.some((channel) => channel.id === id),
    );
    const missingChannels = missingChannelIds.map((id) => ({
        value: id,
        content: id,
    }));

    if (uniqueTypes.size > 1) {
        const groups = Object.entries(groupedChannels).map(([type, items]) => ({
            label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            options: items.map((channel) => ({
                value: channel.id,
                content: channel.name ?? channel.id,
            })),
        }));

        if (missingChannels.length > 0) {
            groups.push({
                label: t('resources.form.others'),
                options: missingChannels,
            });
        }

        return groups;
    }

    return [
        ...channels.map((channel) => ({
            value: channel.id,
            content: channel.name ?? channel.id,
        })),
        ...missingChannels,
    ];
};

export const BaseFormContent = ({
    form,
    channels,
    mode,
    channelsIds,
}: {
    form: ReactFormExtendedApi<CommonFormValues, undefined>;
    channels: Channel[];
    mode: 'create' | 'edit';
    /**
     * used only in edit mode (current resource channels)
     */
    channelsIds?: string[] | undefined;
}) => {
    const options = useMemo(() => {
        return transformChannels(channels, channelsIds ?? []);
    }, [channels, channelsIds]);

    return (
        <Fragment>
            <FormRow label={t('resources.form.name')} required>
                <form.Field name="name">
                    {(field) => <TextField type="text" field={field} />}
                </form.Field>
            </FormRow>

            <FormRow label={t('resources.form.description')}>
                <form.Field name="description">
                    {(field) => <TextAreaField field={field} minRows={2} />}
                </form.Field>
            </FormRow>

            <FormRow label={t('resources.form.url')} required>
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
                label={t('resources.form.keywords')}
                required
                labelHelpPopover={
                    <HelpMark
                        popoverProps={{
                            className: b('help-mark'),
                        }}
                    >
                        {t('resources.form.keywordsHelp')}
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

            <FormRow label={t('resources.form.notificationChannel')} required>
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
                label={t('resources.form.monitoringStartDate')}
                required
                labelHelpPopover={
                    <HelpMark
                        popoverProps={{
                            className: b('help-mark'),
                        }}
                    >
                        {t('resources.form.monitoringStartDateHelp')}
                    </HelpMark>
                }
            >
                <form.Field name="startDate">
                    {(field) => <DatePickerField field={field} />}
                </form.Field>
            </FormRow>

            <FormRow label={t('resources.form.checkInterval')} required>
                <Flex gap={2}>
                    <form.Field name="interval.minutes">
                        {(field) => (
                            <Flex direction="column">
                                <Text variant="caption-2">
                                    {t('resources.form.minutes')}
                                </Text>
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
                                <Text variant="caption-2">
                                    {t('resources.form.hours')}
                                </Text>
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
                                <Text variant="caption-2">
                                    {t('resources.form.days')}
                                </Text>
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
                                <Text variant="caption-2">
                                    {t('resources.form.months')}
                                </Text>
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
                                <Text variant="caption-2">
                                    {t('resources.form.dayOfWeek')}
                                </Text>
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
