import { Fragment, useCallback, useMemo, useState } from 'react';

import { FormRow } from '@gravity-ui/components';
import {
    Button,
    HelpMark,
    SegmentedRadioGroup,
    spacing,
} from '@gravity-ui/uikit';
import { type ReactFormExtendedApi, useStore } from '@tanstack/react-form';

import {
    FormSection,
    NumberField,
    SegmentedRadioGroupField,
    SwitchField,
} from '~/packages/form';
import { ZoneType } from '~/services/api/resource';

import { SelectZoneDialog } from './SelectZoneDialog';

import type { CommonFormValues } from '../types';
import type { IArea } from '@bmunozg/react-image-area';

export const ScreenshotSection = ({
    form,
}: {
    form: ReactFormExtendedApi<CommonFormValues, undefined>;
}) => {
    const [zoneSelectionOpen, setZoneSelectionOpen] = useState(false);

    const isScreenshot = useStore(
        form.store,
        (state) => state.values.isScreenshot,
    );

    const isZoneSelected = useStore(
        form.store,
        (state) => state.values.zoneType === ZoneType.zone,
    );

    const areas = useStore(form.store, (state) => state.values.areas);

    const initialAreas: IArea[] = useMemo(() => {
        if (!areas) {
            return [];
        }

        return areas.map((area) => ({
            ...area,
            unit: 'px' as const,
        }));
    }, [areas]);

    const url = useStore(form.store, (state) => state.values.url);

    const onDialogSubmit = useCallback(
        (areas: IArea[]) => {
            form.setFieldValue('areas', areas);
        },
        [form],
    );

    return (
        <FormSection title="Скриншоты">
            <FormRow label="Включить">
                <form.Field name="isScreenshot">
                    {(field) => <SwitchField field={field} />}
                </form.Field>
            </FormRow>

            {isScreenshot && (
                <Fragment>
                    <FormRow
                        label="Чувствительность"
                        labelHelpPopover={
                            <HelpMark>
                                Может быть от 0 до 100 включительно. Где 0 –
                                любое изменение (или их отсутствие), 100 –
                                изменения на скриншоте не отслеживаются
                            </HelpMark>
                        }
                        required
                    >
                        <form.Field name="sensitivity">
                            {(field) => (
                                <NumberField
                                    allowDecimal
                                    field={field}
                                    min={0}
                                    max={100}
                                    step={0.00001}
                                    controlProps={{
                                        pattern: '.*',
                                    }}
                                />
                            )}
                        </form.Field>
                    </FormRow>

                    <FormRow label="Зона отслеживания">
                        <form.Field name="zoneType">
                            {(field) => (
                                <SegmentedRadioGroupField
                                    width="max"
                                    field={field}
                                >
                                    <SegmentedRadioGroup.Option
                                        value={ZoneType.fullPage}
                                    >
                                        Вся страница
                                    </SegmentedRadioGroup.Option>
                                    <SegmentedRadioGroup.Option
                                        value={ZoneType.zone}
                                        disabled={!url}
                                    >
                                        Выбранная область
                                    </SegmentedRadioGroup.Option>
                                </SegmentedRadioGroupField>
                            )}
                        </form.Field>

                        {isZoneSelected && (
                            <Fragment>
                                <Button
                                    className={spacing({ mt: 2 })}
                                    onClick={() => setZoneSelectionOpen(true)}
                                    width="max"
                                    disabled={!url}
                                >
                                    Выбрать
                                </Button>

                                <SelectZoneDialog
                                    onSubmit={onDialogSubmit}
                                    setOpen={setZoneSelectionOpen}
                                    open={zoneSelectionOpen}
                                    initialValue={initialAreas}
                                    url={url}
                                />
                            </Fragment>
                        )}
                    </FormRow>
                </Fragment>
            )}
        </FormSection>
    );
};
