import { DelayedTextInput } from '@gravity-ui/components';

interface SearchInputProps {
    value: string;
    onUpdate: (value: string) => void;
    placeholder?: string;
    width?: number;
}

export const SearchInput = ({
    value,
    onUpdate,
    placeholder = 'Поиск',
    width = 300,
}: SearchInputProps) => {
    return (
        <DelayedTextInput
            onUpdate={onUpdate}
            value={value}
            placeholder={placeholder}
            style={{ width }}
        />
    );
};
