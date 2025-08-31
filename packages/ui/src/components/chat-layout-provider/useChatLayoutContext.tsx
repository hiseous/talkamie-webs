'use client';

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useGetChatApi } from "../../utils/api/chat/get";

export type ChatLayoutContextType = ReturnType<typeof useChatLayoutContext> | undefined;
export const useChatLayoutContext = () => {
    const params = useParams();
    const paramId = params.id as string | undefined;
    
    const localUser = useLocalUser();
    const getApi = useGetChatApi();

    useEffect(() => {
        if(localUser?.id && paramId){
            getApi.trigger({
                itemId: paramId,
            });
        }
    }, [paramId]);

    return {
        ...getApi,
    };
}