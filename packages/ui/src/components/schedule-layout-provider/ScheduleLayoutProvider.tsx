'use client';

import { createContext } from "react";
import { ScheduleLayoutContextType, useScheduleLayoutContext } from "./useScheduleLayoutContext";

interface ScheduleLayoutProviderProps {
    children?: React.ReactNode;
}
export const ScheduleLayoutContext = createContext<ScheduleLayoutContextType>(undefined);
export const ScheduleLayoutProvider = (props: ScheduleLayoutProviderProps) => {
    const context = useScheduleLayoutContext();

    return (
        <ScheduleLayoutContext.Provider
            value={{...context}}
        >
            {props.children}
        </ScheduleLayoutContext.Provider>
    )
}