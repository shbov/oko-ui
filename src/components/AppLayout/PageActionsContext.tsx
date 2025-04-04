import type { ReactNode, SVGProps } from 'react';
import { createContext, useContext, useState } from 'react';

export interface PageAction {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export interface PrimaryPageAction extends PageAction {
    icon?: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface SecondaryPageAction extends PageAction {
    theme?: 'danger' | 'normal';
    icon?: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}

interface PageActionsContextType {
    primaryActions: PrimaryPageAction[];
    secondaryActions: SecondaryPageAction[];
    setPrimaryActions: (actions: PrimaryPageAction[]) => void;
    setSecondaryActions: (actions: SecondaryPageAction[]) => void;
}

const PageActionsContext = createContext<PageActionsContextType | undefined>(
    undefined,
);

export const usePageActions = () => {
    const context = useContext(PageActionsContext);
    if (!context) {
        return undefined;
    }
    return context;
};

interface PageActionsProviderProps {
    children: ReactNode;
}

export const PageActionsProvider = ({ children }: PageActionsProviderProps) => {
    const [primaryActions, setPrimaryActions] = useState<PageAction[]>([]);
    const [secondaryActions, setSecondaryActions] = useState<PageAction[]>([]);

    return (
        <PageActionsContext.Provider
            value={{
                primaryActions,
                secondaryActions,
                setPrimaryActions,
                setSecondaryActions,
            }}
        >
            {children}
        </PageActionsContext.Provider>
    );
};
