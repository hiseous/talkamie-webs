import { chatMessageDeliveryStatus } from "./chat";
import { itemId, itemsMap, queryPaginationProps } from "./global.types";
import { supportMessageProps, supportTicketProps } from "./support";
import { wsEventAction, wsSendMessageRequestBody } from "./ws";

export type wsSendSupportMessageRequestBody = Pick<wsSendMessageRequestBody, 'message'> & {
    ticketId?: itemId;
    // userId?: itemId;
}
export type wsSendSupportMessageRespData = {
    ticket?: supportTicketProps;
    message?: supportMessageProps;
}


export type wsNewSupportMessageRespData = {
    ticket?: Pick<supportTicketProps, 'id'>;
    message?: supportMessageProps;
}
export type wsGetSupportMessagesProps = {
    ticketId?: itemId;
    // userId?: itemId;
}
export type wsGetSupportMessagesRespData = {
    // chatId: itemId;
    ticket?: Pick<supportTicketProps, 'id'>;
    messages?: supportMessageProps[];
}
export type wsUpdateSupportMessagesRequestBody = {
    ticketId: itemId;
    // receiverId?: itemId;
    messagesMap?: itemsMap<{
        status?: chatMessageDeliveryStatus;
    }>;
}
export type wsUpdateSupportMessagesRespData = {
    // chatId: itemId;
    ticket?: Pick<supportTicketProps, 'id'>;
    messagesMap?: itemsMap<supportMessageProps>;
    // viewer?: Pick<userProps, 'id' | 'totalUnreadChats'>;
};


export type wsGetSupportMessagesRequestBody = queryPaginationProps & {
    action: Extract<wsEventAction, 'get-support-messages'>;
    ticketId?: itemId;
    // userId?: itemId;
}