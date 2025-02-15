import { zod } from '~/services/zod';

export enum ZoneType {
    fullPage = 'fullPage',
    zone = 'zone',
}

export const createSchema = zod.object({
    name: zod.string().min(3),
    url: zod.string().url().trim(),
    isScreenshot: zod.boolean(),
    sensitivity: zod.number().min(0).max(1),
    zoneType: zod.enum([ZoneType.fullPage, ZoneType.zone]),
    areas: zod.array(zod.object({})),
});

export type FormValues = zod.infer<typeof createSchema>;
