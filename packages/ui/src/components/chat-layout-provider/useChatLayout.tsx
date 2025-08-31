import { useContext } from "react";
import { ChatLayoutContext } from "./ChatLayoutProvider";

export const useChatLayout = () => {
    return useContext(ChatLayoutContext)
}
