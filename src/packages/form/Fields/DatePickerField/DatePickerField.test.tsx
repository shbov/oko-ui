import { useForm } from '@tanstack/react-form';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { DatePickerField } from './DatePickerField';

type TestFormData = {
    date: Date | null;
};

const testSchema = zod.object({
    date: zod.date().refine((val) => val !== null, {
        message: 'Date is required',
    }),
});

describe('DatePickerField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                date: null,
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="date">
                    {(field) => (
                        <div>
                            <label htmlFor="date">Date</label>
                            <DatePickerField field={field} id="date" />
                        </div>
                    )}
                </form.Field>
            </form>
        );
    };

    it('renders correctly', () => {
        render(<TestForm />);
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
    });
});
