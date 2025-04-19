import { Box, Label, Popover } from '@gravity-ui/uikit';

import type { Resource } from '~/services/api/resource';

import { isResourceMonitoringActive } from './utils';

import type { DateTime } from '@gravity-ui/date-utils';

export const ResourceStatus = ({
    enabled,
    startDate,
}: {
    enabled: Resource['enabled'];
    startDate: DateTime | undefined;
}) => {
    const isMonitoringActive = isResourceMonitoringActive(startDate);

    const tooltipText =
        isMonitoringActive && enabled
            ? 'Ресурс активно мониторится'
            : enabled
              ? 'Ресурс ожидает наступления даты начала мониторинга'
              : 'Ресурс приостановлен и не мониторится';

    return (
        <Popover content={<Box spacing={{ p: 2 }}>{tooltipText}</Box>} hasArrow>
            {isMonitoringActive && enabled ? (
                <Label theme="success">Активен</Label>
            ) : enabled ? (
                <Label theme="info">Ждёт начало мониторинга</Label>
            ) : (
                <Label theme="warning">Неактивен</Label>
            )}
        </Popover>
    );
};
