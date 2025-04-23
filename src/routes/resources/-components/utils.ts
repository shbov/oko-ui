import {
    ZoneType,
    type CreateResourceRequest,
    type EditResourceRequest,
} from '~/services/api/resource';

import type { CreateFormValues, EditFormValues } from './constants';

// Подготовка массива областей для создания ресурса
// Преобразует данные из формы в формат, ожидаемый API
const prepareAreas = (areas: CreateFormValues['areas']) => {
    return (
        areas?.map((area) => ({
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height,
        })) ?? []
    );
};

// Преобразование данных формы создания ресурса в формат API
// Обрабатывает различные типы ресурсов (скриншот/обычный) и их специфичные поля
export const prepareCreateValues = ({
    name,
    description,
    url,
    channels,
    isScreenshot,
    sensitivity,
    keywords,
    zoneType,
    areas,
    interval,
    startDate,
}: CreateFormValues) => {
    // Обработка ключевых слов: разбиение строки на массив и удаление пустых значений
    const parsedKeywords = keywords
        ? keywords
              .split(',')
              .map((keyword) => keyword.trim())
              .filter(Boolean)
        : [];

    // Преобразование интервала в формат API
    const patchedInterval: CreateResourceRequest['interval'] = {
        day_of_week: interval.dayOfWeek,
        days: interval.days,
        hours: interval.hours,
        minutes: interval.minutes,
        months: interval.months,
    };

    // Общие поля для всех типов ресурсов
    const commonValues = {
        name,
        description,
        url,
        channels,
        keywords: parsedKeywords,
        interval: patchedInterval,
        starts_from: Math.round(startDate?.getTime() / 1000),
    };

    // Если ресурс не является скриншотом, возвращаем только общие поля
    if (!isScreenshot) {
        return commonValues;
    }

    // Для скриншота добавляем специфичные поля
    return {
        ...commonValues,
        sensitivity,
        zone_type: zoneType,
        ...(zoneType === ZoneType.fullPage
            ? {}
            : { areas: prepareAreas(areas) }),
    };
};

// Преобразование данных формы редактирования ресурса
// Использует prepareCreateValues и добавляет ID ресурса
export const prepareEditValues = (
    values: EditFormValues,
    id: string,
): EditResourceRequest => {
    return {
        ...prepareCreateValues(values),
        id,
    };
};
