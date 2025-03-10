export const isStringNumber = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') {
        return false;
    }

    const num = Number(trimmedValue);
    return !isNaN(num) && isFinite(num);
};
