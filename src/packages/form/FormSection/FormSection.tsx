import { Flex, spacing, Text } from '@gravity-ui/uikit';

import type { FormSectionProps } from './types';

export const FormSection = ({ title, children }: FormSectionProps) => {
    return (
        <Flex direction="column">
            <Text variant="subheader-2" className={spacing({ mb: 3 })}>
                {title}
            </Text>

            {children}
        </Flex>
    );
};
