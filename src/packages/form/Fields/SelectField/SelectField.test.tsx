import { useForm } from '@tanstack/react-form';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { SelectField } from './SelectField';

type TestFormData = {
    country: string;
};

const testSchema = zod.object({
    country: zod.string().min(1, { message: 'Country is required' }),
});

describe('SelectField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                country: '',
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="country">
                    {(field) => (
                        <div>
                            <label htmlFor="country">Country</label>
                            <SelectField
                                field={field}
                                id="country"
                                options={[
                                    { value: 'us', content: 'United States' },
                                    { value: 'ca', content: 'Canada' },
                                ]}
                            />
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

        expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });

    it('handles selection', () => {
        act(() => {
            render(<TestForm />);
        });

        const select = screen.getByLabelText('Country');

        act(() => {
            fireEvent.change(select, { target: { value: 'us' } });
        });

        expect(select).toHaveValue('us');
    });
});
