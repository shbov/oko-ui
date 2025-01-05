import { InternalError } from '@gravity-ui/illustrations';
import { PlaceholderContainer } from '@gravity-ui/uikit';

import type {
    PlaceholderContainerActionProps,
    PlaceholderContainerProps,
} from '@gravity-ui/uikit';

const DEFAULT_ACTION: PlaceholderContainerActionProps = {
    text: 'Перезагрузить',
    onClick: () => window.location.reload(),
};

type ErrorContainerProps = Omit<PlaceholderContainerProps, 'image'> & {
    image?: PlaceholderContainerProps['image'];
};

export const ErrorContainer = ({
    title,
    description,
    actions = [DEFAULT_ACTION],
    image = <InternalError />,
    ...props
}: ErrorContainerProps) => {
    return (
        <PlaceholderContainer
            {...props}
            image={image}
            title={title ?? 'Что-то пошло не так'}
            description={description ?? 'Попробуйте перезагрузить страницу'}
            actions={actions}
        />
    );
};
