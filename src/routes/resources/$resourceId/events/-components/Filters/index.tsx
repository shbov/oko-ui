import type { Dispatch, SetStateAction } from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { RangeDatePicker } from '@gravity-ui/date-components';
import {
    Button,
    Flex,
    isSelectGroupTitle,
    Select,
    spacing,
    useSelectOptions,
} from '@gravity-ui/uikit';

import type { EventFilter } from './types';
import type { RangeValue } from '@gravity-ui/date-components';
import type { DateTime } from '@gravity-ui/date-utils';
import type { SelectOption, SelectProps } from '@gravity-ui/uikit';

export type InitialValues = {
    types: ('keyword' | 'image')[];
    dateFrom: DateTime;
    dateTo: DateTime;
};

export const Filters = ({
    setFilters,
    multiple = false,
    initialValues,
}: {
    setFilters: Dispatch<SetStateAction<EventFilter | null>>;
    multiple?: boolean;
    initialValues: InitialValues;
}) => {
    // Состояние для хранения выбранных типов событий
    const [types, setTypes] = useState<('keyword' | 'image')[]>(
        initialValues.types,
    );
    // Состояние для хранения даты начала периода
    const [from, setFrom] = useState<DateTime>(initialValues.dateFrom);
    // Состояние для хранения даты окончания периода
    const [to, setTo] = useState<DateTime>(initialValues.dateTo);

    // Обновление фильтров при изменении любого из параметров
    useEffect(() => {
        setFilters(
            (prev: EventFilter | null) =>
                ({
                    ...prev,
                    types,
                    dateFrom: from.unix(),
                    dateTo: to.unix(),
                }) satisfies EventFilter,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [types, from, to]);

    // Опции для выбора типа события
    const options = useSelectOptions({
        options: [
            {
                content: 'В тексте по ключевому слову',
                value: 'keyword',
            },
            {
                content: 'В изображении',
                value: 'image',
            },
        ],
    });

    // Обработчик изменения периода дат
    const onDatePickerUpdate = useCallback(
        (value: RangeValue<DateTime> | null) => {
            if (value) {
                setFrom(value.start);
                setTo(value.end);
            }
        },
        [setFrom, setTo],
    );

    const renderFilter: SelectProps['renderFilter'] = useCallback(() => {
        if (!multiple) {
            return <Fragment />;
        }

        const optionsWithoutGroupLabels = options.filter(
            (option) => !isSelectGroupTitle(option),
        ) as SelectOption[];

        const allOptionsSelected = Boolean(
            types.length && optionsWithoutGroupLabels.length === types.length,
        );

        const handleAllOptionsButtonClick = () => {
            const nextValue = allOptionsSelected
                ? []
                : optionsWithoutGroupLabels.map((option) => option.value);

            setTypes(nextValue as ('keyword' | 'image')[]);
        };

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '4px 4px 0 4px',
                }}
            >
                <Button onClick={handleAllOptionsButtonClick}>
                    {allOptionsSelected ? 'Снять все' : 'Выбрать все'}
                </Button>
            </div>
        );
    }, [options, types.length, multiple]);

    return (
        <Flex
            gap={2}
            alignItems="center"
            justifyContent="flex-start"
            className={spacing({
                mb: 3,
            })}
        >
            <Select
                value={types}
                options={options}
                onUpdate={setTypes as Dispatch<SetStateAction<string[]>>}
                placeholder="Выберите тип"
                title="Тип"
                filterable
                renderFilter={renderFilter}
                hasClear
                hasCounter
                multiple={multiple}
            />
            <RangeDatePicker
                value={{
                    start: from,
                    end: to,
                }}
                placeholder="Интервал времени"
                onUpdate={onDatePickerUpdate}
            />
        </Flex>
    );
};
