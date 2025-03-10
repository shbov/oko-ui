import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useMatches } from '@tanstack/react-router';

export const Meta = ({ children }: { children: ReactNode }) => {
    const matches = useMatches();
    const title = matches.at(-1)?.staticData?.crumb;

    useEffect(() => {
        document.title = [title, OKO.title].filter(Boolean).join(' · ');
    }, [title]);

    return children;
};
