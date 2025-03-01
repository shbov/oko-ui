import * as React from 'react';

import { AreaSelector } from '@bmunozg/react-image-area';
import { Dialog } from '@gravity-ui/uikit';

import { toaster } from '~/services/toaster';

import type { IArea } from '@bmunozg/react-image-area';

export const SelectZoneDialog = ({
    open,
    onSubmit,
    setOpen,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
    onSubmit: (areas: IArea[]) => unknown;
}) => {
    const [areas, setAreas] = React.useState<IArea[]>([]);

    const onChangeHandler = React.useCallback((areas: IArea[]) => {
        setAreas(areas);
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} size="l">
            <Dialog.Header caption="Зона для отслеживания" />
            <Dialog.Body>
                <AreaSelector
                    areas={areas}
                    onChange={onChangeHandler}
                    maxAreas={1}
                >
                    <img
                        src="/example.png"
                        alt="background image for selection"
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                    />
                </AreaSelector>
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
