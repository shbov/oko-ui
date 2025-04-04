import { useCallback, useState } from 'react';

import { useDataManager } from '@gravity-ui/data-source';
import { Dialog, Text } from '@gravity-ui/uikit';

import { listChannelsSource } from '~/data-sources';
import { useApiError } from '~/hooks/toasters';
import { api } from '~/services/api';
import type { Channel } from '~/services/api/notification';

interface DeleteChannelProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    deleteChannel: Channel | null;
}

export const DeleteChannel = ({
    open,
    onClose,
    onSuccess,
    deleteChannel,
}: DeleteChannelProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleError = useApiError();
    const dataManager = useDataManager();

    const onChannelDelete = useCallback(() => {
        if (!deleteChannel) {
            return;
        }

        setIsLoading(true);

        void api.notification
            .deleteChannel({
                id: deleteChannel.id,
            })
            .then(() => {
                void dataManager.invalidateSource(listChannelsSource);
                onSuccess();
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false);
            });
    }, [dataManager, deleteChannel, handleError, onSuccess]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header caption="Удаление канала" />
            <Dialog.Body>
                <Text>Вы уверены, что хотите удалить канал?</Text>
            </Dialog.Body>
            <Dialog.Footer
                onClickButtonCancel={onClose}
                onClickButtonApply={onChannelDelete}
                loading={isLoading}
                textButtonApply="Удалить"
                textButtonCancel="Отмена"
            />
        </Dialog>
    );
};
