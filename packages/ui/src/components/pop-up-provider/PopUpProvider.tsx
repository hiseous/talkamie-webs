'use client';

import { ReactNode, createContext } from "react";
import { usePopUpContext } from "./usePopUpContext";

interface PopUpProviderProps {
    children?: ReactNode;
}

export type PopUpContext = ReturnType<typeof usePopUpContext> | undefined;
export const PopUpContext = createContext<PopUpContext>(undefined);

export const PopUpProvider = (props: PopUpProviderProps) => {
    const context: PopUpContext = usePopUpContext();

    return (
        <PopUpContext.Provider
            value={{...context}}
        >
            {props.children}
        </PopUpContext.Provider>
    )
}