import * as React from 'react';

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

import { SelectZoneDialog } from './SelectZoneDialog';
import { ZoneType } from '../../constants';

import type { FormValues } from '../../constants';
import type { IArea } from '@bmunozg/react-image-area';

export const ScreenshotSection = ({
    form,
}: {
    form: ReactFormExtendedApi<FormValues, undefined>;
}) => {
    const [zoneSelectionOpen, setZoneSelectionOpen] = React.useState(false);

    const isScreenshot = useStore(
        form.store,
        (state) => state.values.isScreenshot,
    );

    const isZoneSelected = useStore(
        form.store,
        (state) => state.values.zoneType === ZoneType.zone,
    );

    const onDialogSubmit = React.useCallback(
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
                <React.Fragment>
                    <FormRow
                        label="Чувствительность"
                        labelHelpPopover={
                            <HelpMark>1 – любое изменение</HelpMark>
                        }
                        required
                    >
                        <form.Field name="sensitivity">
                            {(field) => (
                                <NumberField
                                    field={field}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    allowDecimal
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
                                    >
                                        Выбранная область
                                    </SegmentedRadioGroup.Option>
                                </SegmentedRadioGroupField>
                            )}
                        </form.Field>

                        {isZoneSelected && (
                            <React.Fragment>
                                <Button
                                    className={spacing({ mt: 2 })}
                                    onClick={() => setZoneSelectionOpen(true)}
                                    width="max"
                                >
                                    Выбрать
                                </Button>

                                <SelectZoneDialog
                                    onSubmit={onDialogSubmit}
                                    setOpen={setZoneSelectionOpen}
                                    open={zoneSelectionOpen}
                                />
                            </React.Fragment>
                        )}
                    </FormRow>
                </React.Fragment>
            )}
        </FormSection>
    );
};
