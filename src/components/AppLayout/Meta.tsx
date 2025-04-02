import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useRouterState } from '@tanstack/react-router';
import { uniq } from 'lodash';

export const Meta = ({ children }: { children: ReactNode }) => {
    const matches = useRouterState({ select: (s) => s.matches });

    const matchWithTitle = [...matches]
        .reverse()
        .find((d) => d.loaderData?.crumb);

    const crumb = matchWithTitle?.loaderData?.crumb;
    const title = typeof crumb === 'string' ? crumb : '';

    useEffect(() => {
        document.title = uniq([title, OKO.title]).filter(Boolean).join(' · ');
    }, [title]);

    return children;
};
