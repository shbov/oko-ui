import { useForm } from '@tanstack/react-form';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { NumberField } from './NumberField';

type TestFormData = {
    age: number;
};

const testSchema = zod.object({
    age: zod.number().min(18, { message: 'Must be at least 18 years old' }),
});

describe('NumberField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                age: 0,
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="age">
                    {(field) => (
                        <div>
                            <label htmlFor="age">Age</label>
                            <NumberField field={field} id="age" />
                        </div>
                    )}
                </form.Field>
            </form>
        );
    };

    it('renders correctly', () => {
        act(() => {
            render(<TestForm />);
        });
        expect(screen.getByLabelText('Age')).toBeInTheDocument();
    });

    it('handles number input', () => {
        act(() => {
            render(<TestForm />);
        });
        const input = screen.getByLabelText('Age');

        act(() => {
            fireEvent.change(input, { target: { value: '25' } });
        });

        expect(input).toHaveValue('25');
    });
});
