import type { CreateFormValues, EditFormValues } from './constants';

export const prepareCreateValue = (value: CreateFormValues) => {
    return {
        name: value.name,
        type: value.type[0],
        params: JSON.parse(value.params),
    };
};

export const prepareEditValue = (value: EditFormValues, id: string) => {
    return {
        id,
        name: value.name,
        type: value.type[0],
        params: JSON.parse(value.params),
    };
};
