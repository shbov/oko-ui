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
                  params: JSON.stringify({
                      chat_id: value.chatId
                          ?.split(',')
                          .map((id) => id.trim())
                          .filter(Boolean),
                  }),
              }
            : {
                  type: ChannelType.Email,
                  params: JSON.stringify({
                      email: value.email
                          ?.split(',')
                          .map((email) => email.trim())
                          .filter(Boolean),
                  }),
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
                  params: JSON.stringify({
                      chat_id: value.chatId
                          ?.split(',')
                          .map((id) => id.trim())
                          .filter(Boolean),
                  }),
              }
            : {
                  type: ChannelType.Email,
                  params: JSON.stringify({
                      email: value.email
                          ?.split(',')
                          .map((email) => email.trim())
                          .filter(Boolean),
                  }),
              }),
    };
};
