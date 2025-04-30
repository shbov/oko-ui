import { useMemo } from 'react';

import { type PlaceholderContainerProps } from '@gravity-ui/uikit';

import { ErrorContainer as ErrorContainerBase } from '~/components/ErrorContainer';
import { t } from '~/services/i18n';

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
    const actions = useMemo(() => {
        const items = [];

        if (props.action) {
            items.push({
                text: props.action?.text || t('common.tryAgain'),
                onClick: props.action?.handler,
            });
        }

        return items;
    }, [props.action]);

    return (
        <ErrorContainerBase
            {...props}
            title={props.title || props.error?.name}
            description={props.description || props.error?.message}
            actions={actions}
        />
    );
};
