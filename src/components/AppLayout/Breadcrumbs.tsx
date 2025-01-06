import * as React from 'react';

import { ActionBar } from '@gravity-ui/navigation';
import { Breadcrumbs as UIBreadcrumbs } from '@gravity-ui/uikit';
import { useMatches, useNavigate } from '@tanstack/react-router';

export const Breadcrumbs = () => {
    const matches = useMatches();
    const navigate = useNavigate();

    const matchesWithCrumbs = matches.filter(
        (match) => match.staticData?.crumb,
    );

    const items = React.useMemo(
        () =>
            matchesWithCrumbs.map((match) => ({
                text: match.staticData?.crumb ?? '–',
                action: () => {
                    void navigate({ to: match.pathname });
                },
            })),
        [matchesWithCrumbs, navigate],
    );

    return (
        <ActionBar aria-label="Breadcrumbs">
            <ActionBar.Section type="primary">
                <ActionBar.Group>
                    <ActionBar.Item>
                        <UIBreadcrumbs
                            lastDisplayedItemsCount={1}
                            firstDisplayedItemsCount={1}
                            items={items}
                        />
                    </ActionBar.Item>
                </ActionBar.Group>
            </ActionBar.Section>
        </ActionBar>
    );
};
