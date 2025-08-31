'use client';

import { createContext } from "react";
import { ChatLayoutContextType, useChatLayoutContext } from "./useChatLayoutContext";

interface ChatLayoutProviderProps {
    children?: React.ReactNode;
}
export const ChatLayoutContext = createContext<ChatLayoutContextType>(undefined);
export const ChatLayoutProvider = (props: ChatLayoutProviderProps) => {
    const context = useChatLayoutContext();

    return (
        <ChatLayoutContext.Provider
            value={{...context}}
        >
            {props.children}
        </ChatLayoutContext.Provider>
    )
}