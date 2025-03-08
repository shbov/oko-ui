import { useQueryData } from '@gravity-ui/data-source';
import { useForm } from '@tanstack/react-form';

import { ZoneType } from '~/api/resource';
import { listChannelsSource } from '~/data-sources';
import { Form } from '~/packages/form';
import { DataLoader } from '~/services/data-source';

import { CreateFormContent } from './CreateFormContent';
import { createSchema, type FormValues } from '../constants';

import type { CreateFormProps } from './types';

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
            interval: {
                minutes: '*',
                hours: '*',
                days: '*',
                months: '*',
                dayOfWeek: '*',
            },
        } as FormValues,
    });

    return (
        <DataLoader
            errorAction={channelsQuery.refetch}
            error={channelsQuery.error}
            status={channelsQuery.status}
        >
            <Form submitText="Создать" formApi={form} size="m" withCancelButton>
                <CreateFormContent
                    form={form}
                    channels={channelsQuery.data?.channels ?? []}
                />
            </Form>
        </DataLoader>
    );
};
