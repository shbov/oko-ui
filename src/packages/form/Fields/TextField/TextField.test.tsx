import { useForm } from '@tanstack/react-form';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { TextField } from './TextField';

type TestFormData = {
    name: string;
};

const testSchema = zod.object({
    name: zod.string().min(1, { message: 'Name is required' }),
});

describe('TextField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                name: '',
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="name">
                    {(field) => (
                        <div>
                            <label htmlFor="name">Name</label>
                            <TextField field={field} id="name" />
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
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        act(() => {
            render(<TestForm />);
        });
        const input = screen.getByLabelText('Name');

        act(() => {
            fireEvent.change(input, { target: { value: 'John Doe' } });
        });

        expect(input).toHaveValue('John Doe');
    });
});
