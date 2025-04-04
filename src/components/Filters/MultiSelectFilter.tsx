import { useCallback } from 'react';

import { Select } from '@gravity-ui/uikit';

import type { SelectOption } from '@gravity-ui/uikit';

interface MultiSelectFilterProps<T extends string> {
    value: T[];
    onChange: (value: T[]) => void;
    options: SelectOption[];
    placeholder?: string;
}

export const MultiSelectFilter = <T extends string>({
    value,
    onChange,
    options,
    placeholder = 'Выберите значение',
}: MultiSelectFilterProps<T>) => {
    const handleChange = useCallback(
        (newValue: string[]) => {
            onChange(newValue as T[]);
        },
        [onChange],
    );

    return (
        <Select
            value={value}
            onUpdate={handleChange}
            options={options}
            placeholder={placeholder}
            hasClear
            multiple
        />
    );
};
