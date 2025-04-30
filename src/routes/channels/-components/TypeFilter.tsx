import { MultiSelectFilter } from '~/components/Filters/MultiSelectFilter';
import { ChannelType } from '~/services/api/notification';
import { t } from '~/services/i18n';

import type { SelectOption } from '@gravity-ui/uikit';

const typeOptions: SelectOption[] = [
    {
        value: ChannelType.Telegram,
        content: 'Telegram',
    },
    {
        value: ChannelType.Email,
        content: 'Email',
    },
];

interface TypeFilterProps {
    value: ChannelType[];
    onChange: (value: ChannelType[]) => void;
}

export const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
    return (
        <MultiSelectFilter
            value={value}
            onChange={onChange}
            options={typeOptions}
            placeholder={t('channels.type')}
        />
    );
};
