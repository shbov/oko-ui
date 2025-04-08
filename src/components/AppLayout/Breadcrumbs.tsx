import { useMemo } from 'react';

import { ActionBar } from '@gravity-ui/navigation';
import {
    BreadcrumbsItem,
    Button,
    DropdownMenu,
    Icon,
    Breadcrumbs as UIBreadcrumbs,
} from '@gravity-ui/uikit';
import { createLink, isMatch, useMatches } from '@tanstack/react-router';

import { TABLE_ACTION_SIZE } from '~/constants/common';

import { usePageActions } from './PageActionsContext';

const RouterLink = createLink(BreadcrumbsItem);

export const Breadcrumbs = () => {
    const matches = useMatches();
    const actions = usePageActions();

    const items = useMemo(
        () =>
            matches
                .filter((match) => isMatch(match, 'loaderData.crumb'))
                .map(({ pathname, loaderData }) => {
                    return {
                        href: pathname,
                        label: String(loaderData?.crumb) || '',
                    };
                }),
        [matches],
    );

    const secondaryActionsButtons = useMemo(
        () =>
            actions?.secondaryActions
                .filter((action) => action.theme !== 'danger')
                .slice(0, 2) || [],
        [actions],
    );

    const secondaryActionsDropdown = useMemo(() => {
        const allSecondaryActions = actions?.secondaryActions || [];
        const dangerActions = allSecondaryActions.filter(
            (action) => action.theme === 'danger',
        );
        const nonDangerActions = allSecondaryActions
            .filter((action) => action.theme !== 'danger')
            .slice(2);
        return [...dangerActions, ...nonDangerActions];
    }, [actions]);

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
                {actions && (
                    <ActionBar.Group pull="right">
                        {secondaryActionsButtons.map((action, index) => (
                            <ActionBar.Item key={index}>
                                <Button
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    loading={action.loading}
                                    view="flat"
                                >
                                    {action.icon && (
                                        <Icon
                                            data={action.icon}
                                            size={TABLE_ACTION_SIZE + 2}
                                        />
                                    )}
                                    {action.text}
                                </Button>
                            </ActionBar.Item>
                        ))}
                        {actions.primaryActions.map((action, index) => (
                            <ActionBar.Item key={index}>
                                <Button
                                    view="action"
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    loading={action.loading}
                                >
                                    {action.icon && (
                                        <Icon
                                            data={action.icon}
                                            size={TABLE_ACTION_SIZE + 2}
                                        />
                                    )}
                                    {action.text}
                                </Button>
                            </ActionBar.Item>
                        ))}
                        {secondaryActionsDropdown.length > 0 && (
                            <ActionBar.Item>
                                <DropdownMenu
                                    items={secondaryActionsDropdown.map(
                                        (action) => ({
                                            text: action.text,
                                            action: action.onClick,
                                            disabled: action.disabled,
                                            theme: action.theme,
                                            iconStart: action.icon && (
                                                <Icon
                                                    data={action.icon}
                                                    size={TABLE_ACTION_SIZE}
                                                />
                                            ),
                                        }),
                                    )}
                                    defaultSwitcherProps={{
                                        extraProps: {
                                            'aria-label': 'More',
                                        },
                                    }}
                                />
                            </ActionBar.Item>
                        )}
                    </ActionBar.Group>
                )}
            </ActionBar.Section>
        </ActionBar>
    );
};
