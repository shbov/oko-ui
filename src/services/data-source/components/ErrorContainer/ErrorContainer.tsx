import React from 'react';

import { Bug } from '@gravity-ui/icons';
import {
    Icon,
    PlaceholderContainer,
    type PlaceholderContainerProps,
} from '@gravity-ui/uikit';

import type { QueryError } from '../../types';
import type { ErrorAction, ErrorViewProps } from '@gravity-ui/data-source';

interface CustomAction extends ErrorAction {
    text?: string;
}

export type ErrorContainerProps = Omit<
    Partial<PlaceholderContainerProps>,
    'action'
> &
Omit<ErrorViewProps<QueryError>, 'action'> & { action?: CustomAction };

export const ErrorContainer = (props: ErrorContainerProps) => {
    const actions = React.useMemo(() => {
        const items = [];

        if (props.action) {
            items.push({
                text: props.action?.text || 'Попробовать еще раз',
                onClick: props.action?.handler,
            });
        }

        return items;
    }, [props.action]);

    return (
        <PlaceholderContainer
            {...props}
            title={props.title || props.error?.name}
            description={props.description || props.error?.message}
            image={<Icon data={Bug} width={64} height={64} />}
            actions={actions}
        />
    );
};
