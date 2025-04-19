import { useCallback, useMemo, useState } from 'react';

import { AreaSelector } from '@bmunozg/react-image-area';
import { idle, useQueryData } from '@gravity-ui/data-source';
import { Database } from '@gravity-ui/illustrations';
import { Dialog, PlaceholderContainer } from '@gravity-ui/uikit';

import { getScreenshotByUrlSource } from '~/data-sources';
import { DataLoader } from '~/services/data-source';
import { toaster } from '~/services/toaster';

import type { IArea } from '@bmunozg/react-image-area';

export const SelectZoneDialog = ({
    open,
    onSubmit,
    setOpen,
    url,
    initialValue,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
    onSubmit: (areas: IArea[]) => unknown;
    url: string;
    initialValue: IArea[];
}) => {
    const [areas, setAreas] = useState<IArea[]>(initialValue);

    const getScreenshotQuery = useQueryData(
        getScreenshotByUrlSource,
        open && url ? { url } : idle,
    );

    const onChangeHandler = useCallback((areas: IArea[]) => {
        setAreas(areas);
    }, []);

    const image = useMemo(() => {
        return `data:image/png;base64, ${getScreenshotQuery.data}`;
    }, [getScreenshotQuery.data]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} size="l">
            <Dialog.Header caption="Зона для отслеживания" />
            <Dialog.Body>
                {url ? (
                    <DataLoader
                        status={getScreenshotQuery.status}
                        error={getScreenshotQuery.error}
                        errorAction={() => {
                            void getScreenshotQuery.refetch();
                        }}
                    >
                        <AreaSelector
                            areas={areas}
                            onChange={onChangeHandler}
                            maxAreas={1}
                        >
                            <img
                                src={image}
                                alt="background image for selection"
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                }}
                            />
                        </AreaSelector>
                    </DataLoader>
                ) : (
                    <PlaceholderContainer
                        image={<Database />}
                        title="Не задан URL для отслеживания"
                        description="Задайте URL, чтобы установить зону для отслеживания"
                        size="m"
                    />
                )}
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
