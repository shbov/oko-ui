import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';

import { useRouterState } from '@tanstack/react-router';
import { uniq } from 'lodash';

export const Meta = ({ children }: { children: ReactNode }) => {
    const matches = useRouterState({ select: (s) => s.matches });

    const crumbs = useMemo(() => {
        return matches
            .map((match) => match.loaderData?.crumb)
            .map((crumb) => (typeof crumb === 'string' ? crumb : ''))
            .filter(Boolean);
    }, [matches]);

    useEffect(() => {
        document.title = uniq([...crumbs, OKO.title])
            .reverse()
            .filter(Boolean)
            .join(' | ');
    }, [crumbs]);

    return children;
};
