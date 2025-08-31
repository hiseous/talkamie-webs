import { chatsMap } from "../../components/dashboard-provider/useDashChats";
import { responsePagination } from "../api/useFetchApi";
import { alertProps } from "./alert";
import { callProps, callType } from "./call";
import { chatMessageDeliveryStatus, chatMessageProps, chatProps } from "./chat";
import { itemId, itemsMap, queryPaginationProps } from "./global.types";
import { userProps } from "./user";
import { wsGetSupportMessagesRespData, wsNewSupportMessageRespData, wsSendSupportMessageRespData, wsUpdateSupportMessagesRespData } from "./ws-support-ticket";

export type wsStatus = {
    state?: 'connected' | 'connecting' | 'disconnected' | 'disconnecting';
    initialized?: boolean;
    authed?: boolean;
};

export type wsEventAction = 
    // General
    'ping' | 'authenticate' | 'alert' | 'signal'

    // Messaging
    | 'send-message' | 'get-messages' | 'new-message' | 'update-messages'
    // | 'new-message-request' | 'message-request-accepted' | 'message-request-rejected'

    // Support Ticket Messaging
    | 'send-support-message' | 'get-support-messages' | 'new-support-message' | 'update-support-messages'

    // Call Flow
    | 'call-user' | 'user-calling' | 'call-accepted' | 'call-rejected'
    | 'accept-call' | 'reject-call' | 'end-call' | 'call-ended'
    | 'call-connected' | 'call-disconnected'

    // Updates
    | 'update-user' | 'update-chats' | 'update-alerts'
;

export type wsRequestBody = Record<itemId, any> & {
    action?: wsEventAction;
};

export type wsResponse<dataType = unknown> = {
    action?: wsEventAction;
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: dataType;
    pagination?: responsePagination;
}

export type wsAuthRequestBody = {
    action: Extract<wsEventAction, 'authenticate'>;
    token?: string;
}
export type wsAuthRespData = userProps | undefined;

export type wsGetMessagesProps = {
    chatId: itemId;
    // receiverId?: itemId;
}
export type wsGetMessagesRequestBody = queryPaginationProps & {
    action: Extract<wsEventAction, 'get-messages'>;
    chatId: itemId;
    // receiverId?: itemId;
}
export type wsGetMessagesRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    messages?: chatMessageProps[];
}
export type wsNewMessageRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    message?: chatMessageProps;
    viewer?: Pick<userProps, 'id' | 'totalUnreadChats'>;
}

export type wsSendMessageRequestBody = {
    chatId: itemId;
    // receiverId?: itemId;
    message?: {
        text?: string;
    };
}
export type wsSendMessageRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    message?: chatMessageProps;
}

export type wsUpdateMessagesRequestBody = {
    chatId: itemId;
    // receiverId?: itemId;
    messagesMap?: itemsMap<{
        status?: chatMessageDeliveryStatus;
    }>;
}
export type wsUpdateMessagesRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    messagesMap?: itemsMap<chatMessageProps>;
    viewer?: Pick<userProps, 'id' | 'totalUnreadChats'>;
};

export type wsUpdateChatsRespData = {
    chatsMap?: chatsMap;
}

export type wsCallUserRequestBody = {
    chatId: itemId;
    // receiverId?: itemId;
    type?: callType;
}
export type wsCallUserRespData = {
    chatId: itemId;
    call?: callProps;
};
export type wsUserCallingRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    call?: callProps;
}

export type wsAcceptCallRequestBody = {
    callId?: itemId;
}
export type wsAcceptCallRespData = wsCallUserRespData;
export type wsCallAcceptedRespData = wsUserCallingRespData;

export type wsRejectCallRequestBody = wsAcceptCallRequestBody;
export type wsRejectCallRespData = wsAcceptCallRespData;
export type wsCallRejectedRespData = wsCallAcceptedRespData;

export type wsEndCallRequestBody = wsAcceptCallRequestBody;
export type wsEndCallRespData = wsAcceptCallRespData;
export type wsCallEndedRespData = wsCallAcceptedRespData & {
    me?: userProps;
};

type signalProps = Partial<RTCSessionDescriptionInit> & {
    candidate?: RTCIceCandidate;
}
export type wsSignalRequestBody = {
    chatId: itemId;
    // receiverId?: itemId;
    signal?: signalProps;
}
export type wsSignalRespData = {
    // chatId: itemId;
    chat?: Pick<chatProps, 'id'>;
    signal?: signalProps;
}

// export type wsNewMessageRequestRespData = {
//     // chatId: itemId;
//     chat?: Pick<chatProps, 'id' | 'request'>;
//     message?: chatMessageProps;
// }
// export type wsMessageRequestAcceptedRespData = wsNewMessageRequestRespData;
// export type wsMessageRequestRejectedRespData = {
//     chat?: Pick<chatProps, 'id'>;
// };

export type wsAlertRespData = {
    alert?: alertProps;
}

export type wsCallConnectedRequestBody = wsAcceptCallRequestBody & {
    timestamp?: number; //unix timestamp;
}
export type wsCallDisconnectedRequestBody = wsCallConnectedRequestBody;


export type wsUpdateAlertsRequestBody = {
    alertsMap?: itemsMap<{
        status?: alertProps['status'];
    }>;
}
export type wsUpdateAlertsRespData = {
    alertsMap?: wsUpdateAlertsRequestBody['alertsMap'];
    viewer?: Pick<userProps, 'id' | 'totalUnreadAlerts'>;
};

export type wsUpdateUserRespData = {
    user?: userProps;
};


export type wsRequestResponseProps = {
    loading?: boolean;
    initiallyLoading?: boolean;
}
export type wsRequestResponses = {
    [eventName in wsEventAction]?: wsRequestResponseProps;
}



export type wsOnMessageCallbacks = {
    onAuth?: (response?: wsResponse<wsAuthRespData>) => void;

    onSendMessage?: (response?: wsResponse<wsSendMessageRespData>) => void;
    onNewMessage?: (response?: wsResponse<wsNewMessageRespData>) => void;
    onGetMessages?: (response?: wsResponse<wsGetMessagesRespData>) => void;
    onUpdateMessages?: (response?: wsResponse<wsUpdateMessagesRespData>) => void;
    
    onSendSupportMessage?: (response?: wsResponse<wsSendSupportMessageRespData>) => void;
    onNewSupportMessage?: (response?: wsResponse<wsNewSupportMessageRespData>) => void;
    onGetSupportMessages?: (response?: wsResponse<wsGetSupportMessagesRespData>) => void;
    onUpdateSupportMessages?: (response?: wsResponse<wsUpdateSupportMessagesRespData>) => void;

    onUpdateChats?: (response?: wsResponse<wsUpdateChatsRespData>) => void;
    onCallUser?: (response?: wsResponse<wsCallUserRespData>) => void;
    onUserCalling?: (response?: wsResponse<wsUserCallingRespData>) => void;
    onAcceptCall?: (response?: wsResponse<wsAcceptCallRespData>) => void;
    onCallAccepted?: (response?: wsResponse<wsCallAcceptedRespData>) => void;
    onRejectCall?: (response?: wsResponse<wsRejectCallRespData>) => void;
    onCallRejected?: (response?: wsResponse<wsCallRejectedRespData>) => void;
    onEndCall?: (response?: wsResponse<wsEndCallRespData>) => void;
    onCallEnded?: (response?: wsResponse<wsCallEndedRespData>) => void;
    onSignal?: (response?: wsResponse<wsSignalRespData>) => void;
    // onNewMessageRequest?: (response?: wsResponse<wsNewMessageRequestRespData>) => void;
    // onMessageRequestAccepted?: (response?: wsResponse<wsMessageRequestAcceptedRespData>) => void;
    // onMessageRequestRejected?: (response?: wsResponse<wsMessageRequestRejectedRespData>) => void;
    onAlert?: (response?: wsResponse<wsAlertRespData>) => void;
    onUpdateAlerts?: (response?: wsResponse<wsUpdateAlertsRespData>) => void;
    onUpdateUser?: (response?: wsResponse<wsUpdateUserRespData>) => void;
}

export type wsRefs = {
    socket?: WebSocket;
    onMessageCallbacks?: wsOnMessageCallbacks;
    status?: wsStatus;
}