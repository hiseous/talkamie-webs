'use client';

import { createContext } from "react";
import { UserProfileContextType, useUserProfileContext } from "./useUserProfileContext";

interface UserProfileProviderProps {
    children?: React.ReactNode;
}
export const UserProfileContext = createContext<UserProfileContextType>(undefined);
export const UserProfileProvider = (props: UserProfileProviderProps) => {
    const context = useUserProfileContext();

    return (
        <UserProfileContext.Provider
            value={{...context}}
        >
            {props.children}
        </UserProfileContext.Provider>
    )
}