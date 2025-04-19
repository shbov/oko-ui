import { useState } from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { useForm } from '@tanstack/react-form';

import { listChannelsSource } from '~/data-sources';
import { Form } from '~/packages/form';
import { ZoneType } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';

import { BaseFormContent } from './BaseFormContent';
import { editSchema } from '../constants';

import type { EditFormProps } from './types';
import type { EditFormValues } from '../constants';

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

        if (resource.areas.length > 0) {
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
            sensitivity: 1,
            keywords: resource.keywords.join(', '),
            isScreenshot: resource.make_screenshot,
            zoneType,
            areas: resource.areas,
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
                submitText="Сохранить"
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
