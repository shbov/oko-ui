import { ZoneType } from '~/services/api/resource';
import { zod } from '~/services/zod';

export const createSchema = zod.object({
    name: zod.string().min(3),
    description: zod.string().optional(),
    url: zod.string().url().trim(),
    channels: zod.array(zod.string()).min(1),
    isScreenshot: zod.boolean(),
    sensitivity: zod.number().min(0).max(100).optional(),
    zoneType: zod.enum([ZoneType.fullPage, ZoneType.zone]).optional(),
    keywords: zod.string().min(1),
    startDate: zod.date(),
    interval: zod.object({
        minutes: zod.string().min(1),
        hours: zod.string().min(1),
        days: zod.string().min(1),
        months: zod.string().min(1),
        dayOfWeek: zod.string().min(1),
    }),
    areas: zod
        .array(
            zod.object({
                x: zod.number(),
                y: zod.number(),
                width: zod.number(),
                height: zod.number(),
            }),
        )
        .optional(),
});

export const editSchema = zod.object({
    name: zod.string().min(3),
    description: zod.string().optional(),
    url: zod.string().url().trim(),
    channels: zod.array(zod.string()).min(1),
    isScreenshot: zod.boolean(),
    sensitivity: zod.number().min(0).max(100).optional(),
    zoneType: zod.enum([ZoneType.fullPage, ZoneType.zone]).optional(),
    keywords: zod.string().min(1),
    startDate: zod.date(),
    interval: zod.object({
        minutes: zod.string().min(1),
        hours: zod.string().min(1),
        days: zod.string().min(1),
        months: zod.string().min(1),
        dayOfWeek: zod.string().min(1),
    }),
    areas: zod
        .array(
            zod.object({
                x: zod.number(),
                y: zod.number(),
                width: zod.number(),
                height: zod.number(),
            }),
        )
        .optional(),
});

export type CreateFormValues = zod.infer<typeof createSchema>;
export type EditFormValues = zod.infer<typeof editSchema>;
