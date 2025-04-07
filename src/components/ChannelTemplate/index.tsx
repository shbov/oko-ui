import { Fragment } from 'react';

import { capitalize } from 'lodash';

import type { Channel } from '~/services/api/notification';

export const ChannelTemplate = ({
    channel,
}: {
    channel: Channel | undefined;
}) => {
    if (!channel) {
        return null;
    }

    return <Fragment>{capitalize(channel.type)}</Fragment>;
};
