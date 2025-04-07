import { ChannelType } from '~/services/api/notification';
import { zod } from '~/services/zod';

const baseSchema = zod.object({
    name: zod.string().min(3),
    type: zod
        .array(zod.enum([ChannelType.Telegram, ChannelType.Email]))
        .length(1),
    params: zod.string().transform((val, ctx) => {
        try {
            JSON.parse(val);

            return val;
        } catch (_e) {
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: 'Invalid JSON string',
            });
            return zod.NEVER;
        }
    }),
});

export type BaseFormValues = zod.infer<typeof baseSchema>;

export const createSchema = baseSchema;
export const editSchema = baseSchema;

export interface CreateFormValues extends BaseFormValues {
    params: string;
}

export interface EditFormValues extends BaseFormValues {
    params: string;
}
