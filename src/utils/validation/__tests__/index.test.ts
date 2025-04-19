import { describe, expect, test } from 'vitest';

import { getErrorMessage } from '../index';

import type { ValidationError } from '@tanstack/react-form';

describe('getErrorMessage', () => {
    test('should return the first part of a string error message before the comma', () => {
        const errors: ValidationError[] = [
            'This is an error, with more details',
        ];
        const result = getErrorMessage(errors);
        expect(result).toBe('This is an error');
    });

    test('should return undefined when errors array is empty', () => {
        const errors: ValidationError[] = [];
        const result = getErrorMessage(errors);
        expect(result).toBeUndefined();
    });

    test('should return undefined when first error is not a string', () => {
        const errors: ValidationError[] = [null];
        const result = getErrorMessage(errors);
        expect(result).toBeUndefined();
    });

    test('should handle error message without comma', () => {
        const errors: ValidationError[] = ['Simple error message'];
        const result = getErrorMessage(errors);
        expect(result).toBe('Simple error message');
    });
});
