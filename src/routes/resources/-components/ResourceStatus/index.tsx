import { Box, Label, Popover } from '@gravity-ui/uikit';

import type { Resource } from '~/services/api/resource';
import { t } from '~/services/i18n';

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
        (isMonitoringActive && enabled)
            ? t('resources.status.activeNote')
            : enabled
              ? t('resources.status.waitingNote')
              : t('resources.status.pausedNote');

    return (
        <Popover content={<Box spacing={{ p: 2 }}>{tooltipText}</Box>} hasArrow>
            {isMonitoringActive && enabled ? (
                <Label theme="success">{t('resources.status.active')}</Label>
            ) : enabled ? (
                <Label theme="info">{t('resources.status.waiting')}</Label>
            ) : (
                <Label theme="warning">{t('resources.status.paused')}</Label>
            )}
        </Popover>
    );
};
