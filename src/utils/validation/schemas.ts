import { zod } from '~/services/zod';

export const emailSchema = zod
    .string()
    .email({ message: 'Некорректный адрес электронной почты' });

// TODO(@shbov): think about password safety rules (with backend)

// Определяем схему для пароля
export const passwordSchema = zod
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .max(100, { message: 'Пароль должен содержать не более 100 символов' })
    .regex(/[a-z]/, {
        message: 'Пароль должен содержать хотя бы одну строчную букву',
    })
    .regex(/[A-Z]/, {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
    })
    .regex(/\d/, { message: 'Пароль должен содержать хотя бы одну цифру' })
    .regex(/[^a-zA-Z0-9]/, {
        message: 'Пароль должен содержать хотя бы один специальный символ',
    });
