import { ChannelType } from '~/services/api/notification';
import { zod } from '~/services/zod';

const baseSchema = zod
    .object({
        name: zod.string().min(3),
        type: zod.enum([ChannelType.Telegram, ChannelType.Email]),
        chatId: zod.string().optional(),
        email: zod.string().optional(),
    })
    .refine(
        (data) => {
            if (data.type === ChannelType.Telegram) {
                return !!data.chatId;
            }
            return true;
        },
        {
            message: 'Чат ID обязателен для каналов',
            path: ['chatId'],
        },
    )
    .refine(
        (data) => {
            if (data.type === ChannelType.Email) {
                return !!data.email;
            }
            return true;
        },
        {
            message: 'Email обязателен для каналов',
            path: ['email'],
        },
    );

export type BaseFormValues = zod.infer<typeof baseSchema>;

export const createSchema = baseSchema;
export const editSchema = baseSchema;

export type CreateFormValues = BaseFormValues;
export type EditFormValues = BaseFormValues;
