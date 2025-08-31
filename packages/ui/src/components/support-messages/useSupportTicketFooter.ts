'use client';

import { useState } from "react";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { getNewKey } from "../../utils/funcs/string/string";
import { supportTicketProps } from "../../utils/types/support";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type message = {
    text?: string;
    key?: string;
}
type useSupportTicketFooterProps = {
    ticket: supportTicketProps | undefined;
    updateTicket?: (supportTicketProps?: supportTicketProps) => void;
}

export const useSupportTicketFooter = (props?: useSupportTicketFooterProps) => {
    const appSocket = useAppSocket();
    const localUser = useLocalUser();
    const [message, setMessage] = useState<message>({});

    const handles = {
        onTextChange: (text?: string) => {
            setMessage(prev => ({
                ...prev,
                text,
            }))
        },
        sendMessage: () => {
            if(message.text){
                if(
                    (!props?.ticket?.id && localUser?.id)
                    || (props?.ticket?.id && props.ticket.status !== 'closed')
                ){
                    appSocket?.sendSupportMessage({
                        ticketId: props?.ticket?.id,
                        // userId: localUser?.id,
                        message: {
                            text: message.text,
                        },
                    });
                
                    //reset text field;
                    setMessage({
                        key: getNewKey(),
                    });
                }
            }
        },
    };


    return {
        ...handles,
        message,
    };
};