import * as React from 'react';

import { AreaSelector } from '@bmunozg/react-image-area';
import { idle, useQueryData } from '@gravity-ui/data-source';
import { Dialog } from '@gravity-ui/uikit';

import { getScreenshotByUrlSource } from '~/data-sources';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import type { IArea } from '@bmunozg/react-image-area';

export const SelectZoneDialog = ({
    open,
    onSubmit,
    setOpen,
    url,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
    onSubmit: (areas: IArea[]) => unknown;
    url: string;
}) => {
    const [areas, setAreas] = React.useState<IArea[]>([]);
    const getScreenshotQuery = useQueryData(
        getScreenshotByUrlSource,
        open ? { url } : idle,
    );

    const onChangeHandler = React.useCallback((areas: IArea[]) => {
        setAreas(areas);
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} size="l">
            <Dialog.Header caption="Зона для отслеживания" />
            <Dialog.Body>
                <DataLoader
                    status={getScreenshotQuery.status}
                    error={getScreenshotQuery.error}
                    errorAction={() => {
                        console.log('refetch');
                        void getScreenshotQuery.refetch();
                    }}
                >
                    <AreaSelector
                        areas={areas}
                        onChange={onChangeHandler}
                        maxAreas={1}
                    >
                        <img
                            src={getScreenshotQuery.data?.data}
                            alt="background image for selection"
                            style={{
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    </AreaSelector>
                </DataLoader>
            </Dialog.Body>
            <Dialog.Footer
                onClickButtonCancel={() => setOpen(false)}
                onClickButtonApply={() => {
                    onSubmit(areas);

                    toaster.add({
                        name: 'zone-added-success',
                        title: 'Зона сохранена',
                        content: 'Выбранная зона для отслеживания сохранена',
                        theme: 'success',
                    });

                    setOpen(false);
                }}
                textButtonApply="Сохранить"
                textButtonCancel="Отменить"
            />
        </Dialog>
    );
};
