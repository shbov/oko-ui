import { zod } from '~/services/zod';

export enum ZoneType {
    fullPage = 'fullPage',
    zone = 'zone',
}

export const createSchema = zod.object({
    name: zod.string().min(3),
    description: zod.string().optional(),
    url: zod.string().url().trim(),
    channels: zod.array(zod.string()),
    isScreenshot: zod.boolean(),
    sensitivity: zod.number().min(0).max(1).optional(),
    zoneType: zod.enum([ZoneType.fullPage, ZoneType.zone]).optional(),
    keywords: zod.string().optional(),
    areas: zod
        .array(
            zod.object({
                x: zod.number(),
                y: zod.number(),
                width: zod.number(),
                height: zod.number(),
                unit: zod.string(),
            }),
        )
        .optional(),
});

export type FormValues = zod.infer<typeof createSchema>;
