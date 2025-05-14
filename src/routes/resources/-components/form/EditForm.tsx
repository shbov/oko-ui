import { useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { useForm } from '@tanstack/react-form';
import { min } from 'lodash';

import { listChannelsSource } from '~/data-sources';
import { Form } from '~/packages/form';
import type { Resource } from '~/services/api/resource';
import { ZoneType } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';
import { t } from '~/services/i18n';

import { BaseFormContent } from './BaseFormContent';
import { editSchema } from '../constants';

import type { EditFormProps } from './types';
import type { EditFormValues } from '../constants';

const getDefaultSensitivity = (resource: Resource) => {
    if (Array.isArray(resource.areas)) {
        const result = resource.areas?.map((area) => area.sensitivity);
        return min(result) ?? 1;
    }

    if (resource.areas?.sensitivity) {
        return resource.areas.sensitivity;
    }

    return 1;
};

export const EditForm = ({ resource, onSubmit }: EditFormProps) => {
    const channelsQuery = useQueryData(listChannelsSource, {});

    const [interval] = useState(() => {
        const splittedInterval = resource.interval.split(' ');
        return {
            minutes: splittedInterval[0],
            hours: splittedInterval[1],
            days: splittedInterval[2],
            months: splittedInterval[3],
            dayOfWeek: splittedInterval[4],
        };
    });

    const [zoneType] = useState(() => {
        if (!resource.areas) {
            return ZoneType.fullPage;
        }

        if (Array.isArray(resource.areas) && resource.areas.length > 0) {
            return ZoneType.zone;
        }

        return ZoneType.fullPage;
    });

    const form = useForm({
        onSubmit,
        validators: {
            onChange: editSchema,
        },
        defaultValues: {
            name: resource.name,
            url: resource.url,
            description: resource.description,
            sensitivity: getDefaultSensitivity(resource),
            keywords: resource.keywords.join(', '),
            isScreenshot: resource.make_screenshot,
            zoneType,
            areas: Array.isArray(resource.areas) ? resource.areas : [],
            channels: resource.channels ?? [],
            startDate: resource.starts_from
                ? dateTimeParse(resource.starts_from)?.toDate()
                : new Date(),
            interval,
        } as EditFormValues,
    });

    return (
        <DataLoader
            errorAction={channelsQuery.refetch}
            error={channelsQuery.error}
            status={channelsQuery.status}
        >
            <Form
                submitText={t('resources.form.save')}
                formApi={form}
                size="m"
                withCancelButton
            >
                <BaseFormContent
                    form={form}
                    channels={channelsQuery.data ?? []}
                    mode="edit"
                />
            </Form>
        </DataLoader>
    );
};
