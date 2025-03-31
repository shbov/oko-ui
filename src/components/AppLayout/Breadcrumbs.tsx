import { useMemo } from 'react';

import { ActionBar } from '@gravity-ui/navigation';
import {
    BreadcrumbsItem,
    Breadcrumbs as UIBreadcrumbs,
} from '@gravity-ui/uikit';
import { createLink, isMatch, useMatches } from '@tanstack/react-router';

const RouterLink = createLink(BreadcrumbsItem);

export const Breadcrumbs = () => {
    const matches = useMatches();

    const items = useMemo(
        () =>
            matches
                .filter((match) => isMatch(match, 'loaderData.crumb'))
                .map(({ pathname, loaderData }) => {
                    return {
                        href: pathname,
                        label: loaderData?.crumb,
                    };
                }),
        [matches],
    );

    return (
        <ActionBar aria-label="Breadcrumbs">
            <ActionBar.Section type="primary">
                <ActionBar.Group pull="left-grow">
                    <ActionBar.Item pull="left-grow">
                        <UIBreadcrumbs itemComponent={RouterLink}>
                            {items.map((i, key) => (
                                <UIBreadcrumbs.Item
                                    key={`${i.href}-${key}`}
                                    href={i.href}
                                >
                                    {i.label}
                                </UIBreadcrumbs.Item>
                            ))}
                        </UIBreadcrumbs>
                    </ActionBar.Item>
                </ActionBar.Group>
            </ActionBar.Section>
        </ActionBar>
    );
};
