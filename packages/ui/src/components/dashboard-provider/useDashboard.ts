'use client';

import { createContext, useContext } from "react";
import { useDashboardContext } from "./useDashboardContext";

type DashboardContext = ReturnType<typeof useDashboardContext> | undefined;
export const DashboardContext = createContext<DashboardContext>(undefined);
export const useDashboard = () => {
    return useContext(DashboardContext)
}