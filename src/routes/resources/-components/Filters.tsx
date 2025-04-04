import { FiltersContainer } from '~/components/Filters/FiltersContainer';
import { SearchInput } from '~/components/Filters/SearchInput';

interface FiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export const Filters = ({ search, onSearchChange }: FiltersProps) => {
    return (
        <FiltersContainer>
            <SearchInput
                value={search}
                onUpdate={onSearchChange}
                placeholder="Фильтр по URL или названию"
            />
        </FiltersContainer>
    );
};
