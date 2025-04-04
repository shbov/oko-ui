import { useQueryData } from '@gravity-ui/data-source';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { useForm } from '@tanstack/react-form';

import { listChannelsSource } from '~/data-sources';
import { Form } from '~/packages/form';
import { ZoneType } from '~/services/api/resource';
import { DataLoader } from '~/services/data-source';

import { BaseFormContent } from './BaseFormContent';
import { createSchema } from '../constants';

import type { CreateFormProps } from './types';
import type { CreateFormValues } from '../constants';

export const CreateForm = ({ onSubmit }: CreateFormProps) => {
    const channelsQuery = useQueryData(listChannelsSource, {});

    const form = useForm({
        onSubmit,
        validators: {
            onChange: createSchema,
        },
        defaultValues: {
            name: '',
            url: '',
            description: '',
            sensitivity: 1,
            keywords: '',
            isScreenshot: false,
            zoneType: ZoneType.fullPage,
            areas: [],
            channels: [],
            startDate: dateTimeParse('now')?.toDate(),
            interval: {
                minutes: '*',
                hours: '*',
                days: '*',
                months: '*',
                dayOfWeek: '*',
            },
        } as CreateFormValues,
    });

    return (
        <DataLoader
            errorAction={channelsQuery.refetch}
            error={channelsQuery.error}
            status={channelsQuery.status}
        >
            <Form submitText="Создать" formApi={form} size="m" withCancelButton>
                <BaseFormContent
                    form={form}
                    channels={channelsQuery.data ?? []}
                    mode="create"
                />
            </Form>
        </DataLoader>
    );
};
