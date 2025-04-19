import { dateTimeParse, type DateTime } from '@gravity-ui/date-utils';

export const isResourceMonitoringActive = (startDate: DateTime | undefined) => {
    if (!startDate) {
        return false;
    }

    return startDate.isBefore(dateTimeParse('now'));
};
