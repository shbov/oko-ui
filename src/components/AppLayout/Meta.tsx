import * as React from 'react';

import { useMatches } from '@tanstack/react-router';

export const Meta = ({ children }: { children: React.ReactNode }) => {
    const matches = useMatches();
    const title = matches.at(-1)?.staticData?.crumb;

    React.useEffect(() => {
        document.title = [title, OKO.title].filter(Boolean).join(' · ');
    }, [title]);

    return children;
};
