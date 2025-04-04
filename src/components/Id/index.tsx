import { Text } from '@gravity-ui/uikit';

export const Id = ({ id }: { id: string }) => {
    return (
        <Text style={{ fontFamily: 'var(--g-font-family-monospace)' }}>
            {id}
        </Text>
    );
};
