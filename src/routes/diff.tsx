import { createFileRoute } from '@tanstack/react-router';
import ReactDiffViewer from 'react-diff-viewer';

import { NotFound } from '~/components/NotFound';
import { Page } from '~/components/Page';

const oldCode = `
Приказ Росздравнадзора от 17.06.2024 № 3518
Об утверждении Порядка фармаконадзора лекарственных препаратов для медицинского применения
`;

const newCode = `
Приказ Росздравнадзора от 13.10.2024 № 3651
Об утверждении Порядка приостановления применения лекарственного препарата для медицинского применения
`;

const Diff = () => {
    return (
        <Page title={'Найдены изменения в содержании'}>
            <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
            />
        </Page>
    );
};

export const Route = createFileRoute('/diff')({
    component: Diff,
    notFoundComponent: NotFound,
    staticData: {
        crumb: OKO.title,
    },
});
