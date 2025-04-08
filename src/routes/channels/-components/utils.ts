import type {
    CreateChannelRequest,
    EditChannelRequest,
} from '~/services/api/notification';
import { ChannelType } from '~/services/api/notification';

import type { CreateFormValues, EditFormValues } from './constants';

export const prepareCreateValue = (
    value: CreateFormValues,
): CreateChannelRequest => {
    return {
        name: value.name,
        ...(value.type === ChannelType.Telegram
            ? {
                  type: ChannelType.Telegram,
                  chatId: value.chatId ?? '',
              }
            : {
                  type: ChannelType.Email,
                  email: value.email ?? '',
              }),
    };
};

export const prepareEditValue = (
    value: EditFormValues,
    id: string,
): EditChannelRequest => {
    return {
        id,
        name: value.name,
        ...(value.type === ChannelType.Telegram
            ? {
                  type: ChannelType.Telegram,
                  chatId: value.chatId ?? '',
              }
            : {
                  type: ChannelType.Email,
                  email: value.email ?? '',
              }),
    };
};
