import { useCallback, useState } from 'react';

import { useDataManager } from '@gravity-ui/data-source';
import { Dialog, Text } from '@gravity-ui/uikit';

import { listResources } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { api } from '~/services/api';
import type { Resource } from '~/services/api/resource';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    deleteResource: Resource | null;
}

export const DeleteDialog = ({
    open,
    onClose,
    onSuccess,
    deleteResource,
}: DeleteDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleError = useApiError();
    const dataManager = useDataManager();

    const onResourceDelete = useCallback(() => {
        if (!deleteResource) {
            return;
        }

        setIsLoading(true);

        api.resource
            .deleteResource(deleteResource.id)
            .then(() => {
                void dataManager.invalidateSource(listResources);

                onSuccess();
            })
            .catch(handleError)
            .finally(() => setIsLoading(false));
    }, [dataManager, deleteResource, handleError, onSuccess]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header caption="Удаление ресурса" />
            <Dialog.Body>
                <Text>Вы уверены, что хотите удалить ресурс?</Text>
            </Dialog.Body>
            <Dialog.Footer
                onClickButtonCancel={onClose}
                onClickButtonApply={onResourceDelete}
                loading={isLoading}
                textButtonApply="Удалить"
                textButtonCancel="Отмена"
            />
        </Dialog>
    );
};
