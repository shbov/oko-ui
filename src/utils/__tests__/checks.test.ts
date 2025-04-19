import { expect, test, describe } from 'vitest';

import { isStringNumber } from '../checks';

describe('isStringNumber', () => {
    test('returns true for numeric strings', () => {
        expect(isStringNumber('123')).toBe(true);
        expect(isStringNumber('0')).toBe(true);
        expect(isStringNumber('456.78')).toBe(true);
        expect(isStringNumber('-42')).toBe(true);
        expect(isStringNumber('3.14')).toBe(true);
    });

    test('returns false for non-numeric strings', () => {
        expect(isStringNumber('hello')).toBe(false);
        expect(isStringNumber('123abc')).toBe(false);
        expect(isStringNumber('abc123')).toBe(false);
        expect(isStringNumber('12.3.45')).toBe(false);
        expect(isStringNumber('-')).toBe(false);
    });

    test('returns false for empty strings', () => {
        expect(isStringNumber('')).toBe(false);
    });

    test('returns false for strings with only spaces', () => {
        expect(isStringNumber('   ')).toBe(false);
    });

    test('returns true for strings with leading/trailing spaces around numbers', () => {
        expect(isStringNumber(' 123 ')).toBe(true);
        expect(isStringNumber(' -42 ')).toBe(true);
    });

    test('returns false for NaN and Infinity', () => {
        expect(isStringNumber('NaN')).toBe(false);
        expect(isStringNumber('Infinity')).toBe(false);
        expect(isStringNumber('-Infinity')).toBe(false);
    });
});
