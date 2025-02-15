import * as React from 'react';

import { ActionBar } from '@gravity-ui/navigation';
import {
    BreadcrumbsItem,
    Breadcrumbs as UIBreadcrumbs,
} from '@gravity-ui/uikit';
import { createLink, useMatches } from '@tanstack/react-router';

const RouterLink = createLink(BreadcrumbsItem);

export const Breadcrumbs = () => {
    const matches = useMatches();

    const matchesWithCrumbs = matches.filter(
        (match) => match.staticData?.crumb,
    );

    const items = React.useMemo(
        () =>
            matchesWithCrumbs.map((match) => ({
                text: match.staticData?.crumb ?? '–',
                href: match.pathname,
            })),
        [matchesWithCrumbs],
    );

    return (
        <ActionBar aria-label="Breadcrumbs">
            <ActionBar.Section type="primary">
                <ActionBar.Group>
                    <ActionBar.Item>
                        <UIBreadcrumbs itemComponent={RouterLink} showRoot>
                            {items.map((i) => (
                                <UIBreadcrumbs.Item key={i.href} href={i.href}>
                                    {i.text}
                                </UIBreadcrumbs.Item>
                            ))}
                        </UIBreadcrumbs>
                    </ActionBar.Item>
                </ActionBar.Group>
            </ActionBar.Section>
        </ActionBar>
    );
};
