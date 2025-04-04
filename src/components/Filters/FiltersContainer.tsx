import { Flex } from '@gravity-ui/uikit';

interface FiltersContainerProps {
    children: React.ReactNode;
}

export const FiltersContainer = ({ children }: FiltersContainerProps) => {
    return <Flex gap={2}>{children}</Flex>;
};
