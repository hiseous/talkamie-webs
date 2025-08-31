'use client';

import { DashboardContext } from "./useDashboard";
import { useDashboardContext } from "./useDashboardContext";

type DashboardProviderProps = {
    children?: React.ReactNode;
}
export const DashboardProvider = (props: DashboardProviderProps) => {
    const context = useDashboardContext();

    return (
        <DashboardContext.Provider
            value={{...context}}
        >
            {props.children}
        </DashboardContext.Provider>
    )
}