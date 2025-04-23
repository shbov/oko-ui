import { zod } from '~/services/zod';

export const emailSchema = zod
    .string()
    .email({ message: 'Некорректный адрес электронной почты' });

export const passwordSchema = zod
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .max(100, { message: 'Пароль должен содержать не более 100 символов' });
