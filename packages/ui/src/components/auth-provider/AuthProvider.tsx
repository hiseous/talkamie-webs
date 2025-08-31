'use client';

import { createContext } from "react";
import { AuthContextType, useAuthContext } from "./useAuthContext";

interface AuthProviderProps {
    children?: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>(undefined);
export const AuthProvider = (props: AuthProviderProps) => {
    const context = useAuthContext();

    return (
        <AuthContext.Provider
            value={{...context}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}