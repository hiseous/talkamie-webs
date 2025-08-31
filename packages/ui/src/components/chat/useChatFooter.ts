'use client';

import { useEffect, useState } from "react";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { chatProps } from "../../utils/types/chat";
import { getNewKey } from "../../utils/funcs/string/string";
import { useSendUserMessageRequestApi } from "../../utils/api/user/send-message-request";

type message = {
    text?: string;
    key?: string;
}
type useChatFooterProps = {
    chat: chatProps | undefined;
    updateChat?: (chatProps?: chatProps) => void;
}

export const useChatFooter = (props?: useChatFooterProps) => {
    const appSocket = useAppSocket();
    const [message, setMessage] = useState<message>({});
    const messageRequestApi = useSendUserMessageRequestApi();

    const handles = {
        onTextChange: (text?: string) => {
            setMessage(prev => ({
                ...prev,
                text,
            }))
        },
        sendMessage: () => {
            if(message.text){
                if(props?.chat?.id && props.chat.request?.status === 'accepted'){
                    appSocket?.sendMessage({
                        chatId: props.chat.id,
                        // receiverId: props.chat.receiver?.id,
                        message: {
                            text: message.text,
                        },
                    });
                }
                else if(props?.chat?.user?.id){
                    //as a message request;
                    messageRequestApi.trigger({
                        itemId: props.chat.user.id,
                        body: {
                            text: message.text,
                        },
                    });
                }
                
                setMessage({
                    key: getNewKey(),
                });
            }
        },
    };

    useEffect(() => {
        if(messageRequestApi.loading == false && messageRequestApi.success){
            if(props?.chat?.id){
                appSocket?.getMessages({chatId: props.chat.id});
            }
            if(props?.updateChat) props.updateChat(messageRequestApi.data?.chat);
        }
    }, [messageRequestApi.loading]);


    return {
        ...handles,
        message,
    };
};