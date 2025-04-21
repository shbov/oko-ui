import { useForm } from '@tanstack/react-form';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { TextAreaField } from './TextAreaField';

type TestFormData = {
    description: string;
};

const testSchema = zod.object({
    description: zod.string().min(1, { message: 'Description is required' }),
});

describe('TextAreaField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                description: '',
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="description">
                    {(field) => (
                        <div>
                            <label htmlFor="description">Description</label>
                            <TextAreaField field={field} id="description" />
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
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('handles text input', () => {
        act(() => {
            render(<TestForm />);
        });
        const textarea = screen.getByLabelText('Description');

        act(() => {
            fireEvent.change(textarea, {
                target: { value: 'Test description' },
            });
        });

        expect(textarea).toHaveValue('Test description');
    });
});
