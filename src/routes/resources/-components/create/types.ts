import type { FormValues } from '~/routes/resources/-components/constants';

export interface CreateFormProps {
    onSubmit: ({ value }: { value: FormValues }) => void;
}
