
import React, { ReactNode, useState } from 'react';

export interface IAppContext {
    showToast: boolean;
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>({
    showToast: false,
    setShowToast: () => {}
});

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    
    const [showToast, setShowToast] = useState<boolean>(false);

    return (<AppContext.Provider value={{showToast, setShowToast}}>
        {children}
    </AppContext.Provider>);
}