import * as React from 'react';

import { useQueryData } from '@gravity-ui/data-source';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { api } from '~/api';
import { Page } from '~/components/Page';
import { getResource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import { EditForm } from '../-components/form/EditForm';
import { prepareEditValues } from '../-components/utils';

import type { EditFormValues } from '../-components/constants';

export const Edit = () => {
    const router = useRouter();
    const handleError = useApiError();
    const params = Route.useParams();

    const { data: resource, ...resourceQuery } = useQueryData(getResource, {
        id: params.resourceId,
    });

    const title = React.useMemo(() => {
        return `Редактировать ресурс ${resource?.resource?.name ?? ''}`;
    }, [resource?.resource?.name]);

    const onSubmit = React.useCallback(
        ({ value }: { value: EditFormValues }) => {
            const valuesToSend = prepareEditValues(value, params.resourceId);

            api.resource
                .edit(valuesToSend)
                .then((r) => {
                    toaster.add({
                        name: 'resource-edited',
                        title: 'Ресурс изменен',
                        content: r.resource?.id,
                        theme: 'success',
                    });

                    void router.navigate({
                        to: '/',
                    });
                })
                .catch(handleError);
        },
        [handleError, params.resourceId, router],
    );

    return (
        <Page title={title}>
            <DataLoader
                error={resourceQuery.error}
                status={resourceQuery.status}
                errorAction={resourceQuery.refetch}
            >
                {resource?.resource && (
                    <EditForm
                        onSubmit={onSubmit}
                        resource={resource.resource}
                    />
                )}
            </DataLoader>
        </Page>
    );
};

export const Route = createFileRoute(
    '/resources/$resourceId/_authenticated/edit',
)({
    component: Edit,
    staticData: {
        crumb: 'Редактировать ресурс',
    },
});
