import { en } from './en';
import { ru } from './ru';

export const translations = {
    en,
    ru,
} as const;

export type Language = keyof typeof translations;

export const defaultLanguage: Language = 'en';

export const getTranslation = (language: Language = defaultLanguage) => {
    return translations[language] ?? translations[defaultLanguage];
};
