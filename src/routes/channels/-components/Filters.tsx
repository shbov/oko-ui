import { FiltersContainer } from '~/components/Filters/FiltersContainer';
import { SearchInput } from '~/components/Filters/SearchInput';
import type { ChannelType } from '~/services/api/notification';

import { TypeFilter } from './TypeFilter';

interface FiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    selectedTypes: ChannelType[];
    onTypesChange: (value: ChannelType[]) => void;
}

export const Filters = ({
    search,
    onSearchChange,
    selectedTypes,
    onTypesChange,
}: FiltersProps) => {
    return (
        <FiltersContainer>
            <SearchInput
                value={search}
                onUpdate={onSearchChange}
                placeholder="Фильтр по названию или ID"
            />
            <TypeFilter value={selectedTypes} onChange={onTypesChange} />
        </FiltersContainer>
    );
};
