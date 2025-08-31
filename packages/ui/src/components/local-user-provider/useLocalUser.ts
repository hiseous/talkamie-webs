'use client';

import { createContext, useContext } from "react";
import { useLocalUserContext } from "./useLocalUserContext";

type localUserContext = ReturnType<typeof useLocalUserContext> | undefined;
export const LocalUserContext = createContext<localUserContext>(undefined);
export const useLocalUser = () => {
    return useContext(LocalUserContext)
}