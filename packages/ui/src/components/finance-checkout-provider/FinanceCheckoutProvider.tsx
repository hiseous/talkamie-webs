'use client';

import { createContext } from "react";
import { FinanceCheckoutContextType, useFinanceCheckoutContext } from "./useFinanceCheckoutContext";

interface FinanceCheckoutProviderProps {
    children?: React.ReactNode;
}
export const FinanceCheckoutContext = createContext<FinanceCheckoutContextType>(undefined);
export const FinanceCheckoutProvider = (props: FinanceCheckoutProviderProps) => {
    const context = useFinanceCheckoutContext();

    return (
        <FinanceCheckoutContext.Provider
            value={{...context}}
        >
            {props.children}
        </FinanceCheckoutContext.Provider>
    )
}