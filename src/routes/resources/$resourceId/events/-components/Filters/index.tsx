import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { RangeDatePicker } from '@gravity-ui/date-components';
import {
    Button,
    Flex,
    isSelectGroupTitle,
    Select,
    spacing,
    TextInput,
    useSelectOptions,
} from '@gravity-ui/uikit';

import type { EventFilter } from './types';
import type { SelectOption, SelectProps } from '@gravity-ui/uikit';

export const Filters = ({
    setFilters,
}: {
    setFilters: Dispatch<SetStateAction<EventFilter>>;
}) => {
    const [value, setValue] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        setFilters((prev: EventFilter) => ({
            ...prev,
            search: search,
            status: value,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, search]);

    const options = useSelectOptions({
        options: [
            {
                content: 'Создано',
                value: 'CREATED',
            },
            {
                content: 'Отправлено',
                value: 'NOTIFIED',
            },
            {
                content: 'Просмотрено',
                value: 'WATCHED',
            },
            {
                content: 'Отреагировано',
                value: 'REACTED',
            },
        ],
    });

    const renderFilter: SelectProps['renderFilter'] = useCallback(() => {
        const optionsWithoutGroupLabels = options.filter(
            (option) => !isSelectGroupTitle(option),
        ) as SelectOption[];

        const allOptionsSelected = Boolean(
            value.length && optionsWithoutGroupLabels.length === value.length,
        );

        const handleAllOptionsButtonClick = () => {
            const nextValue = allOptionsSelected
                ? []
                : optionsWithoutGroupLabels.map((option) => option.value);

            setValue(nextValue);
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
    }, [options, value.length]);

    return (
        <Flex
            gap={2}
            alignItems="center"
            justifyContent="flex-start"
            className={spacing({
                mb: 3,
            })}
        >
            <TextInput
                placeholder="Поиск по ID"
                hasClear
                value={search}
                onUpdate={setSearch}
                style={{
                    width: 300,
                }}
            />
            <Select
                value={value}
                options={options}
                onUpdate={setValue}
                placeholder="Выберите статус"
                title="Статус"
                multiple
                filterable
                renderFilter={renderFilter}
                hasClear
                hasCounter
            />
            <RangeDatePicker placeholder="Интервал времени" />
        </Flex>
    );
};
