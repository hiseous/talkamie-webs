'use client';

import { createContext } from "react";
import { AppSocketContextType, useAppSocketContext } from "./useAppSocketContext";

interface AppSocketProviderProps {
    children?: React.ReactNode;
}
export const AppSocketContext = createContext<AppSocketContextType>(undefined);
export const AppSocketProvider = (props: AppSocketProviderProps) => {
    const context = useAppSocketContext();

    return (
        <AppSocketContext.Provider
            value={{...context}}
        >
            {props.children}
        </AppSocketContext.Provider>
    )
}