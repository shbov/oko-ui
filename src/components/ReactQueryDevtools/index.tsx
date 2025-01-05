import { cn } from '@bem-react/classname';
import { ReactQueryDevtools as Devtools } from '@tanstack/react-query-devtools';

import './ReactQueryDevtools.scss';

const b = cn('react-query-devtools');

export const ReactQueryDevtools = () => {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className={b()}>
            <Devtools buttonPosition="relative" initialIsOpen={false} />
        </div>
    );
};
