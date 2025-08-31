// import { wsRequestResponses } from "./ws";

import { alertProps } from "./alert";
import { callProps, callType } from "./call";
import { itemId } from "./global.types";
import { userProps } from "./user";
import { wsRequestResponses } from "./ws";

// export type appSocketRefs = {
//     requests?: wsRequestResponses;
// }

export type appSocketCallUserHandleProps = {
    type?: callType;
    // body?: wsCallUserRequestBody;
    receiver?: userProps;
    chatId?: itemId;
}
// export type appSocketCallState = {
//     onCall?: boolean;
//     status?: 'calling' | 'ringing' | 'connected' | 'ended';
//     type?: callType;
//     receiver?: userProps;
//     chatId?: itemId;
//     // id?: itemId;
//     duration?: number; //seconds;
//     peerConn?: RTCPeerConnection;
//     streams?: {
//         local?: MediaStream;
//         remote?: MediaStream;
//     };
// }

type callStatusExtra = callProps['status'] | 'calling' | 'connected' | 'connecting' | 'ended';
export type appSocketRefs = {
    requests?: wsRequestResponses;
    peer?: {
        local?: {
            stream?: MediaStream;
            // isOnIceCandidate?: boolean;
            audio?: {
                enabled?: boolean;
            };
            video?: {
                enabled?: boolean;
            },
        };
        remote?: {
            stream?: MediaStream;
            descriptionIsSet?: boolean;
            pendingIceCandidates?: RTCIceCandidate[];
        };
        onCall?: boolean;
        conn?: RTCPeerConnection;
        call?: Omit<callProps, 'status'> & {
            status?: callStatusExtra;
        };
    };
    tempRouteUser?: {
        onAlert?: (alertProps: alertProps) => void;
    };
    // currentChat?: {
    //     id?: itemId;
    //     receiver?: {
    //         id?: itemId;
    //     };
    // };
}
export type appSocketHandleReconnectPeerProps = {
    // peerConn?: RTCPeerConnection;
    chatId?: itemId;
    // receiverId?: itemId;
}
export type appSocketHandleOfferProps = appSocketHandleReconnectPeerProps & {
    streams?: {
        local?: MediaStream;
        // remote?: MediaStream;
    };
    offer: RTCSessionDescriptionInit;
}
export type appSocketHandleAnswerProps = {
    // peerConn?: RTCPeerConnection;
    answer: RTCSessionDescriptionInit;
}
export type appSocketHandleCreateOfferProps = {
    // streams?: {
    //     local?: MediaStream;
    //     // remote?: MediaStream;
    // };
    chatId?: itemId;
    // receiverId?: itemId;
    // peerConn?: RTCPeerConnection;
}
export type appSocketHandleDestroyPeerProps = {
    status?: callStatusExtra;
}
export type appSocketHandleEndCallProps = appSocketHandleDestroyPeerProps;