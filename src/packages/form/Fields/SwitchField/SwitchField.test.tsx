import { useForm } from '@tanstack/react-form';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { zod } from '~/services/zod';

import { SwitchField } from './SwitchField';

type TestFormData = {
    enabled: boolean;
};

const testSchema = zod.object({
    enabled: zod.boolean().refine((val) => val === true, {
        message: 'Must be enabled',
    }),
});

describe('SwitchField', () => {
    const TestForm = () => {
        const form = useForm<TestFormData>({
            defaultValues: {
                enabled: false,
            },
            validators: {
                onChange: testSchema,
            },
        });

        return (
            <form>
                <form.Field name="enabled">
                    {(field) => (
                        <div>
                            <label htmlFor="enabled">Enabled</label>
                            <SwitchField field={field} id="enabled" />
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
        expect(screen.getByLabelText('Enabled')).toBeInTheDocument();
    });

    it('toggles value when clicked', () => {
        act(() => {
            render(<TestForm />);
        });
        const switchInput = screen.getByLabelText('Enabled');

        act(() => {
            fireEvent.click(switchInput);
        });

        expect(switchInput).toBeChecked();
    });
});
