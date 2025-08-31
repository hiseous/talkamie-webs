'use client';

import { useEffect, useRef } from "react";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useWebSocket } from "../web-socket/useWebSocket";
import { wsAcceptCallRequestBody, wsAcceptCallRespData, wsAlertRespData, wsAuthRespData, wsCallAcceptedRespData, wsCallConnectedRequestBody, wsCallDisconnectedRequestBody, wsCallEndedRespData, wsCallRejectedRespData, wsCallUserRequestBody, wsCallUserRespData, wsEndCallRequestBody, wsEndCallRespData, wsEventAction, wsGetMessagesProps, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRejectCallRequestBody, wsRejectCallRespData, wsRequestResponseProps, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData, wsSignalRequestBody, wsSignalRespData, wsUpdateAlertsRequestBody, wsUpdateAlertsRespData, wsUpdateChatsRespData, wsUpdateMessagesRequestBody, wsUpdateMessagesRespData, wsUpdateUserRespData, wsUserCallingRespData } from "../../utils/types/ws";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { Socket } from "socket.io-client";
import { appSocketHandleAnswerProps, appSocketHandleCreateOfferProps, appSocketHandleDestroyPeerProps, appSocketHandleEndCallProps, appSocketHandleOfferProps, appSocketHandleReconnectPeerProps, appSocketRefs } from "../../utils/types/app-socket";
import { __wsUrls } from "../../utils/constants/ws-urls";
import { callProps, callType } from "../../utils/types/call";
import { userProps } from "../../utils/types/user";
import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { useTimer } from "../../utils/funcs/time/useTimer";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { getPresentTime } from "../../utils/funcs/time/present-time";
import { connectRequestStatus } from "../../utils/types/connect";
import { alertProps } from "../../utils/types/alert";
import { wsGetSupportMessagesProps, wsGetSupportMessagesRequestBody, wsGetSupportMessagesRespData, wsNewSupportMessageRespData, wsSendSupportMessageRequestBody, wsSendSupportMessageRespData, wsUpdateSupportMessagesRequestBody, wsUpdateSupportMessagesRespData } from "../../utils/types/ws-support-ticket";

export type AppSocketContextType = ReturnType<typeof useAppSocketContext> | undefined;
export const useAppSocketContext = () => {
    const dashboard = useDashboard();
    const dashboardRef = useRef(dashboard);
    const localUser = useLocalUser();
    const localUserRef = useRef(localUser);
    const socketHook = useWebSocket();
    const signalDebounce = useDebounce();
    const timer = useTimer({
        initialSeconds: 0,
        direction: 'asc',
    });
    // const socket = socketHook.socket;
    // const requestResponses = useRef<wsRequestResponses>({});
    // const [requestResponses, setRequestResponses] = useState<wsRequestResponses>({});
    // const [callState, setCallState] = useState<appSocketCallState>({});
    // const reRender = useState<string | undefined>(undefined);
    const reRender = useRerenderComponent();
    const refs = useRef<appSocketRefs>({});
    // const toast = useToastMessage();
    const peerConfig: RTCConfiguration = {
        iceServers: [
            { urls: __wsUrls.stunServer() },
            {
                // "url": "stun:global.stun.twilio.com:3478",
                "urls": "stun:global.stun.twilio.com:3478"
            },
            {
                "credential": "Xak+mobDt3bxgwdZ9hpDpb8I1uxfRG4pxDs0umdf+64=",
                // "url": "turn:global.turn.twilio.com:3478?transport=udp",
                "urls": "turn:global.turn.twilio.com:3478?transport=udp",
                "username": "ef77121e994429ec1bd419f4f8c4eb09bec6b8cff497006d077c9f7cd4e0d580"
            },
            {
                "credential": "Xak+mobDt3bxgwdZ9hpDpb8I1uxfRG4pxDs0umdf+64=",
                // "url": "turn:global.turn.twilio.com:3478?transport=tcp",
                "urls": "turn:global.turn.twilio.com:3478?transport=tcp",
                "username": "ef77121e994429ec1bd419f4f8c4eb09bec6b8cff497006d077c9f7cd4e0d580"
            },
            {
                "credential": "Xak+mobDt3bxgwdZ9hpDpb8I1uxfRG4pxDs0umdf+64=",
                // "url": "turn:global.turn.twilio.com:443?transport=tcp",
                "urls": "turn:global.turn.twilio.com:443?transport=tcp",
                "username": "ef77121e994429ec1bd419f4f8c4eb09bec6b8cff497006d077c9f7cd4e0d580"
            }
        ],
    };
    
    const handles = {
        setReqResp: (action: wsEventAction, actionProps?: wsRequestResponseProps) => {
            const initiallyLoading = [undefined, true].includes(refs.current.requests?.[action]?.initiallyLoading) ? actionProps?.loading : refs.current.requests?.[action]?.initiallyLoading;

            if(refs.current.requests) refs.current.requests[action] = {...actionProps, initiallyLoading};
            else refs.current.requests = {[action]: {...actionProps, initiallyLoading}};
            // requestResponses.current[action] = {loading};
            // setRequestResponses(prev => ({
            //     ...prev,
            //     [action]: actionProps,
            // }));
            // console.log('--action', refs.current.requests[action])
        },
        onAuth: (response?: wsResponse<wsAuthRespData>) => {
            console.log('authenticate', {response});
            if(response?.success && response.data?.id === localUserRef.current?.id){
                socketHook.updateStatus({
                    authed: true,
                    state: 'connected',
                })
                setTimeout(() => {
                    socketHook.ping();
                }, 2000);
                // socketHook.setStatus(prev => ({
                //     ...prev,
                //     authed: true,
                //     state: 'connected',
                // }));
            }
        },

        //chat-messaging;
        sendMessage: (body: wsSendMessageRequestBody) => {
            socketHook.sendToSocket({
                ...body,
                action: 'send-message',
            });
            handles.setReqResp('send-message', {loading: true});
            handles.reRenderComponent();
        },
        onSendMessage: (response?: wsResponse<wsSendMessageRespData>) => {
            console.log('send-message', {response});

            handles.setReqResp('send-message', {loading: false});
            if(response?.data?.chat?.id){
                dashboardRef.current?.chats.addMessages({
                    chatId: response.data.chat.id,
                    messages: response.data.message ? [response.data.message] : undefined,
                    asNewItems: true,
                });
            }
            handles.reRenderComponent();
        },
        onNewMessage: (response?: wsResponse<wsNewMessageRespData>) => {
            console.log('new-message', {response});

            if(response?.data?.viewer){
                localUserRef.current?.updateUser(response.data.viewer);
            }
            if(response?.data?.chat?.id){
                dashboardRef.current?.chats.addMessages({
                    chatId: response.data.chat.id,
                    messages: response.data.message ? [response.data.message] : undefined,
                    asNewItems: true,
                });
            }
        },
        getMessages: (thisProps: wsGetMessagesProps) => {
            const chat = (thisProps.chatId ? dashboardRef.current?.chats.records?.[thisProps.chatId] : undefined);
            const body: wsGetMessagesRequestBody = {
                action: 'get-messages',
                chatId: thisProps.chatId,
                // receiverId: thisProps.receiverId,
                pageSize: 4,
                lastEvaluatedKey: chat?.messages?.pagination?.lastEvaluatedKey,
            };
            handles.setReqResp('get-messages', {loading: true});
            handles.reRenderComponent();
            socketHook.sendToSocket(body);
        },
        onGetMessages: (response?: wsResponse<wsGetMessagesRespData>) => {
            console.log('get-messages', {response});
            handles.setReqResp('get-messages', {loading: false});
            
            if(response?.data?.chat?.id){
                dashboardRef.current?.chats.addMessages({
                    chatId: response.data.chat.id,
                    messages: response.data.messages,
                    pagination: response?.pagination,
                });
            }
            handles.reRenderComponent();
        },
        updateMessages: (body: wsUpdateMessagesRequestBody) => {//update messages props, such as their read receipts;
            socketHook.sendToSocket({
                ...body,
                action: 'update-messages',
            });
            handles.setReqResp('update-messages', {loading: true});
            handles.reRenderComponent();
        },
        onUpdateMessages: (response?: wsResponse<wsUpdateMessagesRespData>) => {//update messages props only;
            console.log('update-messages', {response});

            handles.setReqResp('update-messages', {loading: false});

            if(response?.data?.viewer){
                localUserRef.current?.updateUser(response.data.viewer);
            }
            if(response?.data?.chat?.id){
                dashboardRef.current?.chats.updateMessages({
                    chatId: response.data.chat.id,
                    messagesMap: response.data.messagesMap,
                });
            }
            handles.reRenderComponent();
        },

        //support ticket messaging;
        sendSupportMessage: (body: wsSendSupportMessageRequestBody) => {
            socketHook.sendToSocket({
                ...body,
                action: 'send-support-message',
            });
            handles.setReqResp('send-support-message', {loading: true});
            handles.reRenderComponent();
        },
        onSendSupportMessage: (response?: wsResponse<wsSendSupportMessageRespData>) => {
            console.log('send-support-message', {response});

            handles.setReqResp('send-support-message', {loading: false});
            if(response?.data?.ticket?.id){
                dashboardRef.current?.supportTickets.addMessages({
                    ticket: response.data.ticket,
                    messages: response.data.message ? [response.data.message] : undefined,
                    asNewItems: true,
                });
            }
            handles.reRenderComponent();
        },
        onNewSupportMessage: (response?: wsResponse<wsNewSupportMessageRespData>) => {
            console.log('new-support-message', {response});

            // if(response?.data?.viewer){
            //     localUserRef.current?.updateUser(response.data.viewer);
            // }
            if(response?.data?.ticket?.id){
                dashboardRef.current?.supportTickets.addMessages({
                    ticket: response.data.ticket,
                    messages: response.data.message ? [response.data.message] : undefined,
                    asNewItems: true,
                });
            }
        },
        getSupportMessages: (thisProps: wsGetSupportMessagesProps) => {
            const ticket = (thisProps.ticketId ? dashboardRef.current?.supportTickets.records?.[thisProps.ticketId] : undefined);
            const body: wsGetSupportMessagesRequestBody = {
                action: 'get-support-messages',
                ticketId: thisProps.ticketId,
                // userId: localUserRef.current?.id,
                pageSize: 4,
                lastEvaluatedKey: ticket?.messages?.pagination?.lastEvaluatedKey,
            };
            handles.setReqResp('get-support-messages', {loading: true});
            handles.reRenderComponent();
            socketHook.sendToSocket(body);
        },
        onGetSupportMessages: (response?: wsResponse<wsGetSupportMessagesRespData>) => {
            console.log('get-support-messages', {response});
            handles.setReqResp('get-support-messages', {loading: false});
            
            if(response?.data?.ticket?.id){
                dashboardRef.current?.supportTickets.addMessages({
                    ticket: response.data.ticket,
                    messages: response.data.messages,
                    pagination: response?.pagination,
                });
            }
            handles.reRenderComponent();
        },
        updateSupportMessages: (body: wsUpdateSupportMessagesRequestBody) => {//update messages props, such as their read receipts;
            socketHook.sendToSocket({
                ...body,
                action: 'update-support-messages',
            });
            handles.setReqResp('update-support-messages', {loading: true});
            handles.reRenderComponent();
        },
        onUpdateSupportMessages: (response?: wsResponse<wsUpdateSupportMessagesRespData>) => {//update messages props only;
            console.log('update-support-messages', {response});

            handles.setReqResp('update-support-messages', {loading: false});

            // if(response?.data?.viewer){
            //     localUserRef.current?.updateUser(response.data.viewer);
            // }
            if(response?.data?.ticket?.id){
                dashboardRef.current?.supportTickets.updateMessages({
                    ticketId: response.data.ticket.id,
                    messagesMap: response.data.messagesMap,
                });
            }
            handles.reRenderComponent();
        },


        onUpdateChats: (response?: wsResponse<wsUpdateChatsRespData>) => {//update messages props only;
            console.log('update-chats', {response});

            // handles.setReqResp('update-chats', {loading: false});

            if(response?.data?.chatsMap){
                dashboardRef.current?.chats.updateChatsMap({
                    chatsMap: response.data.chatsMap,
                })
            }
            handles.reRenderComponent();
        },
        signal: (body: wsSignalRequestBody) => {
            // console.log({signalLoading: refs.current.requests?.signal?.loading, body});
            // if(!refs.current.requests?.signal?.loading){
            // }
            // console.log(refs.current.requests?.signal?.loading, {body})
            socketHook.sendToSocket({
                ...body,
                action: 'signal',
            });
            // handles.setReqResp('signal', {loading: true});
            // handles.reRenderComponent();
        },
        signalDeboucely: (body: wsSignalRequestBody) => {
            const debouncedQuery = signalDebounce.trigger(() => {
                handles.signal(body);
            }, 2000);
            debouncedQuery();
        },
        onSignal: async (response?: wsResponse<wsSignalRespData>) => {
            console.log('signal', {response});

            if(response?.data?.signal?.type === 'offer'){
                // if(!refs.current.peer?.local?.stream){
                //     const stream = await handles.initializeLocalStream(refs.current.peer?.call?.type)
                //     refs.current.peer = {
                //         ...refs.current.peer,
                //         local: {
                //             ...refs.current.peer?.local,
                //             stream,
                //         },
                //     };
                // };
                if(refs.current.peer?.local?.stream){
                    await handles.feedOnOffer({
                        offer: response?.data?.signal as RTCSessionDescriptionInit,
                        streams: {
                            local: refs.current.peer.local.stream,
                        },
                        chatId: response?.data?.chat?.id,
                    });
                }
                else {
                    console.log("local user stream undefined");
                }
            }
            else if(response?.data?.signal?.type === 'answer'){
                await handles.feedOnAnswer({
                    answer: response?.data?.signal as RTCSessionDescriptionInit,
                });
            }

            if(response?.data?.signal?.candidate){
                const iceCandidate = new RTCIceCandidate(response?.data?.signal.candidate);
                // console.log("signal", thisProps.signal.candidate, peerConn.current)
                // await refs.current.peer?.conn?.addIceCandidate(iceCandidate);
                if(refs.current.peer?.remote?.descriptionIsSet){
                    await refs.current.peer?.conn?.addIceCandidate(iceCandidate);
                }
                else {
                    refs.current.peer?.remote?.pendingIceCandidates?.push(iceCandidate);
                }
            }

            // handles.setReqResp('signal', {loading: false});
            handles.reRenderComponent();
            
        },
        callUser: async (body: wsCallUserRequestBody, receiver: userProps | undefined) => {
            const localStream = await handles.initializeLocalStream(body.type);
            refs.current.peer = {
                onCall: true,
                call: {
                    status: 'calling',
                    type: body.type,
                    user: receiver,
                },
                local: {
                    stream: localStream,
                    audio: {
                        enabled: localStream ? true : false,
                    },
                    video: {
                        enabled: localStream && body.type === 'video' ? true : false,
                    },
                },
            };
            socketHook.sendToSocket({
                ...body,
                action: 'call-user',
            });
            handles.setReqResp('call-user', {loading: true});
            handles.reRenderComponent();
        },
        onCallUser: (response?: wsResponse<wsCallUserRespData>) => {
            console.log('call-user', {response});

            if(response?.data?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: response.data.call,
                };
            }

            handles.setReqResp('call-user', {loading: false});
            handles.reRenderComponent();

            if(refs.current.peer?.call?.status !== 'ringing'){
                handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
                    if(refs.current.peer){
                        refs.current.peer.call = {
                            ...refs.current.peer.call,
                            status: refs.current.peer?.call?.status || 'ended',
                        };
                        // refs.current.peer.onCall = undefined;
                        refs.current.peer = undefined;
                        handles.reRenderComponent();
                    }
                });
                if(refs.current.peer?.call?.id){
                    refs.current.peer = {
                        ...refs.current.peer,
                        call: {
                            ...refs.current.peer?.call,
                            status: refs.current.peer?.call?.status || 'ended',
                        },
                    };
                    handles.setReqResp('end-call', {loading: true});
                }
                handles.destroyPeer({status: refs.current.peer?.call?.status}); 
            }
        },
        onUserCalling: (response?: wsResponse<wsUserCallingRespData>) => {
            console.log('user-calling', {response});

            if(response?.data?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: response.data.call,
                };
            }
            handles.reRenderComponent();
        },
        acceptCall: async () => {
            if(refs.current.peer?.call?.id){
                const body: wsAcceptCallRequestBody = {
                    callId: refs.current.peer?.call?.id,
                };
                const localStream = await handles.initializeLocalStream(refs.current.peer.call.type);
                socketHook.sendToSocket({
                    ...body,
                    action: 'accept-call',
                });
                refs.current.peer = {
                    onCall: true,
                    call: {
                        ...refs.current.peer?.call,
                        status: 'connecting',
                    },
                    local: {
                        stream: localStream,
                        audio: {
                            enabled: localStream ? true : false,
                        },
                        video: {
                            enabled: localStream && refs.current.peer.call.type === 'video' ? true : false,
                        },
                    },
                };
                handles.setReqResp('accept-call', {loading: true});
                handles.reRenderComponent();
            }
        },
        onAcceptCall: (response?: wsResponse<wsAcceptCallRespData>) => {
            console.log('accept-call', {response});

            if(response?.data?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: {
                        ...response.data.call,
                        status: 'connecting',
                    },
                };

                //can now send your signal to the caller;
                // handles.createOffer({
                //     chatId: response?.data?.chat?.id,
                //     receiverId: response?.data?.call?.user?.id,
                // });
            }

            handles.setReqResp('accept-call', {loading: false});
            handles.reRenderComponent();
        },
        onCallAccepted: async (response?: wsResponse<wsCallAcceptedRespData>) => {
            console.log('call-accepted', {response});

            if(response?.data?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: {
                        ...response.data.call,
                        status: 'connecting',
                    },
                };

                //can now send your signal (call receiver's) to the caller;
                await handles.createOffer({
                    chatId: response?.data?.chat?.id,
                    // receiverId: response?.data?.call?.user?.id,
                });
            }
            handles.reRenderComponent();
        },
        rejectCall: () => {
            if(refs.current.peer?.call?.id){
                const body: wsRejectCallRequestBody = {
                    callId: refs.current.peer?.call?.id,
                };
                socketHook.sendToSocket({
                    ...body,
                    action: 'reject-call',
                });
                refs.current.peer = {
                    call: {
                        ...refs.current.peer?.call,
                        status: 'rejected',
                    },
                };
                handles.setReqResp('reject-call', {loading: true});
                handles.reRenderComponent();
            }
        },
        onRejectCall: (response?: wsResponse<wsRejectCallRespData>) => {
            console.log('reject-call', {response});

            refs.current.peer = undefined;

            handles.setReqResp('reject-call', {loading: false});
            handles.reRenderComponent();
        },
        onCallRejected: (response?: wsResponse<wsCallRejectedRespData>) => {
            console.log('call-rejected', {response});

            if(response?.data?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: response.data.call,
                };
            }
            handles.endCall({status: response?.data?.call?.status});
        },
        endCall: (thisProps?: appSocketHandleEndCallProps) => {
            handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
                if(refs.current.peer){
                    refs.current.peer.call = {
                        ...refs.current.peer.call,
                        status: thisProps?.status || 'ended',
                    };
                    // refs.current.peer.onCall = undefined;
                    refs.current.peer = undefined;
                    handles.reRenderComponent();
                }
            });
            if(refs.current.peer?.call?.id){
                const body: wsEndCallRequestBody = {
                    callId: refs.current.peer?.call?.id,
                };
                socketHook.sendToSocket({
                    ...body,
                    action: 'end-call',
                });
                refs.current.peer = {
                    ...refs.current.peer,
                    call: {
                        ...refs.current.peer?.call,
                        status: 'ended',
                    },
                };
                handles.setReqResp('end-call', {loading: true});
            }
            handles.destroyPeer(thisProps);
            handles.endTimer();
        },
        onEndCall: (response?: wsResponse<wsEndCallRespData>) => {
            console.log('end-call', {response});

            // refs.current.peer = undefined;
            const call: callProps = {
                ...response?.data?.call,
                duration: refs.current.peer?.call?.duration ?? response?.data?.call?.duration,
            };
            if(dashboardRef.current?.callHistories.wasTriggered){
                dashboardRef.current?.callHistories.addItem(call);
            }

            refs.current.peer = {
                ...refs.current.peer,
                call: {
                    ...refs.current.peer?.call,
                    ...call,
                },
            };

            handles.setReqResp('end-call', {loading: false});
            handles.endTimer();
            handles.reRenderComponent();
        },
        onCallEnded: (response?: wsResponse<wsCallEndedRespData>) => {
            console.log('call-ended', {response});

            const call: callProps = {
                ...response?.data?.call,
                duration: refs.current.peer?.call?.duration ?? response?.data?.call?.duration,
            };
            if(dashboardRef.current?.callHistories.wasTriggered){
                dashboardRef.current?.callHistories.addItem(call);
            }
            if(response?.data?.me){
                localUserRef.current?.updateUser(response.data.me);
            }

            handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
                if(refs.current.peer){
                    refs.current.peer.call = {
                        ...refs.current.peer.call,
                        ...call,
                        status: call?.status || 'ended',
                    };
                    // refs.current.peer.onCall = undefined;
                    refs.current.peer = undefined;
                    handles.reRenderComponent();
                }
            });
            if(refs.current.peer?.call){
                refs.current.peer = {
                    ...refs.current.peer,
                    call: {
                        ...refs.current.peer?.call,
                        ...call,
                    },
                };
                handles.setReqResp('end-call', {loading: false});
            }
            handles.destroyPeer({status: response?.data?.call?.status});
            handles.endTimer();
        },
        onDisconnect: (reason: Socket.DisconnectReason) => {
            console.log('disconnected', {reason});
        },
        // onNewMessageRequest: (response?: wsResponse<wsNewMessageRequestRespData>) => {
        //     console.log('new-message-request', {response});

        //     if(response?.data?.chat?.id){
        //         dashboardRef.current?.chats.addMessages({
        //             chatId: response.data.chat.id,
        //             messages: response.data.message ? [response.data.message] : undefined,
        //             // asNewItems: true,
        //         });
        //     }
        // },
        // onMessageRequestAccepted: (response?: wsResponse<wsMessageRequestAcceptedRespData>) => {
        //     console.log('message-request-accepted', {response});

        //     if(response?.data?.chat?.id){
        //         //update chat props;
        //     }
        // },
        // onMessageRequestRejected: (response?: wsResponse<wsMessageRequestRejectedRespData>) => {
        //     console.log('message-request-rejected', {response});

        //     if(response?.data?.chat?.id){
        //         //update chat props;
        //     }
        // },
        callConnected: (body: wsCallConnectedRequestBody) => {
            socketHook.sendToSocket({
                ...body,
                action: 'call-connected',
            });
        },
        callDisconnected: (body: wsCallDisconnectedRequestBody) => {
            socketHook.sendToSocket({
                ...body,
                action: 'call-disconnected',
            });
        },
        onAlert: async (response?: wsResponse<wsAlertRespData>) => {
            console.log('alert', {response});

            if(response?.data?.alert?.id){
                let addAlert = true;

                if(response.data.alert.chat?.id){
                    //update the chat;
                    dashboardRef.current?.chats.setChatPropsOnly(response.data.alert.chat);
                }
                if(response.data.alert.schedule?.id){
                    if(dashboardRef.current?.schedules.wasTriggered) dashboardRef.current.schedules.addOrReplaceItem(response.data.alert.schedule);
                    if(dashboardRef.current?.upcomingSchedules.wasTriggered) dashboardRef.current.upcomingSchedules.addOrReplaceItem(response.data.alert.schedule);
                }
                if(response.data.alert.connectRequest?.id){
                    if(response.data.alert.connectRequest.status === 'pending' && dashboardRef.current?.pendingReqs.wasTriggered) dashboardRef.current.pendingReqs.addOrReplaceItem(response.data.alert.connectRequest);
                    if(response.data.alert.connectRequest.status === 'accepted'){
                        if(dashboardRef.current?.connections.wasTriggered && response.data.alert.connectRequest.user){
                            //add or replace the user in connections;
                            dashboardRef.current.connections.addOrReplaceItem(response.data.alert.connectRequest.user)
                        }
                        
                        //remove request from pending;
                        dashboardRef.current?.pendingReqs.removeItem(response.data.alert.connectRequest.id);
                    }
                    if((['rejected', 'canceled'] as (connectRequestStatus | undefined)[]).includes(response.data.alert.connectRequest.status)){
                        if(dashboardRef.current?.connections.wasTriggered && response.data.alert.connectRequest.user?.id){
                            //remove the user from connections;
                            dashboardRef.current.connections.removeItem(response.data.alert.connectRequest.user.id)
                        }
                        //remove request from pending;
                        dashboardRef.current?.pendingReqs.removeItem(response.data.alert.connectRequest.id);
                        if(response.data.alert.connectRequest.status === 'canceled') addAlert = false;
                    }
                }
                
                if(addAlert){
                    let existingAlert: alertProps | undefined;
                    if(dashboardRef.current?.alerts.wasTriggered){
                        const addRemProps = dashboardRef.current.alerts.addItemAndRemoveOldOne(response.data.alert);
                        existingAlert = addRemProps.existingAlert;
                    }
                    
                    if(localUserRef.current && !existingAlert?.id){
                        localUserRef.current.totalUnreadAlerts = (localUserRef.current.totalUnreadAlerts ?? 0) + 1;
                    }
                }
                else if(!addAlert){
                    dashboardRef.current?.alerts.removeItem(response.data.alert.id);
                }

                if(refs.current.tempRouteUser?.onAlert) refs.current.tempRouteUser.onAlert(response.data.alert);
            }
        },
        updateAlerts: (body: wsUpdateAlertsRequestBody) => {//update alerts props, such as their read receipts;
            socketHook.sendToSocket({
                ...body,
                action: 'update-alerts',
            });
            handles.setReqResp('update-alerts', {loading: true});
            handles.reRenderComponent();
        },
        onUpdateAlerts: (response?: wsResponse<wsUpdateAlertsRespData>) => {
            console.log('update-alerts', {response});

            handles.setReqResp('update-alerts', {loading: false});

            dashboardRef.current?.alerts.updateByAlertsMap(response?.data?.alertsMap);
            if(response?.data?.viewer){
                localUserRef.current?.updateUser(response.data.viewer);
            }
            handles.reRenderComponent();
        },
        onUpdateUser: (response?: wsResponse<wsUpdateUserRespData>) => {
            console.log('update-user', {response});

            handles.setReqResp('update-user', {loading: false});

            if(response?.data?.user){
                localUserRef.current?.updateUser(response.data.user);
            }
            handles.reRenderComponent();
        },


        initializeLocalStream: async (callType?: callType) => {
            let stream: MediaStream | undefined;
            if(localUserRef.current?.id){
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: callType === 'video' ? true : false,
                        audio: true,
                    });
                    // console.log('tracks', stream.getTracks())
                }
                catch (error) {
                    alert(`failed to get your stream, check your permission`);
                    console.log("Failed to get local stream:", error);
                }

                // refs.current.peer = {
                //     ...refs.current.peer,
                //     local: {
                //         ...refs.current.peer?.local,
                //         stream,
                //     },
                // };
            }
            return stream;
        },
        createOffer: async (thisProps: appSocketHandleCreateOfferProps) => {
            refs.current.peer = {
                ...refs.current.peer,
                conn: new RTCPeerConnection(peerConfig),
            };

            // console.log('create-offer', thisProps.stream.getTracks());
            refs.current.peer.local?.stream?.getTracks().forEach((track) => {
                if(refs.current.peer?.local?.stream) refs.current.peer?.conn?.addTrack(track, refs.current.peer.local?.stream);
            })

            if(refs.current.peer.conn){
                refs.current.peer.conn.oniceconnectionstatechange = () => {
                    const connState = refs.current.peer?.conn?.iceConnectionState;
                    if(connState === 'disconnected'){
                        console.warn('create-offer-state-changed, Connection lost. Attempting to reconnect...');
                        if(refs.current.peer?.call?.id){
                            handles.callDisconnected({
                                callId: refs.current.peer.call.id,
                                timestamp: getPresentTime().unix.milisec,
                            });
                        }
                        handles.reconnect({
                            chatId: thisProps.chatId,
                            // receiverId: thisProps.receiverId,
                        });
                    }
                    else if(connState === 'connected'){
                        refs.current.peer = {
                            ...refs.current.peer,
                            call: {
                                ...refs.current.peer?.call,
                                status: 'connected',
                            },
                        };
                        if(!timer.status) handles.startTimer();
                        if(refs.current.peer.call?.id){
                            handles.callConnected({
                                callId: refs.current.peer.call.id,
                                timestamp: getPresentTime().unix.milisec,
                            });
                        }
                    }

                    console.log('create-offer-state-changed', connState);
                }
                refs.current.peer.conn.onicecandidate = (e) => {
                    if(e.candidate){
                        if(localUserRef.current?.id && thisProps.chatId){
                            // if(!refs.current.peer?.local?.isOnIceCandidate){
                                console.log('create-offer onicecandidate', e.candidate.address)
                                
                                refs.current.peer = {
                                    ...refs.current.peer,
                                    local: {
                                        ...refs.current.peer?.local,
                                        // isOnIceCandidate: true,
                                    },
                                };
                                handles.signal({
                                    chatId: thisProps.chatId,
                                    // receiverId: thisProps.receiverId,
                                    signal: {
                                        candidate: e.candidate,
                                    },
                                });
                            // }
                        }
                        else {
                            console.log("local user id or chat id undefined");
                        }
                    }
                }
                refs.current.peer.conn.ontrack = (e) => {
                    if(refs.current.peer){
                        refs.current.peer.remote = {
                            ...refs.current.peer.remote,
                            stream: e.streams[0],
                        };
                    }
                    else {
                        console.log("peer undefined");
                    }
                }

                const offer = await refs.current.peer?.conn.createOffer();
                await refs.current.peer.conn.setLocalDescription(offer);
                if(localUserRef.current?.id && thisProps.chatId){
                    console.log('create-offer offer')
                    handles.signal({
                        chatId: thisProps.chatId,
                        // receiverId: thisProps.receiverId,
                        signal: offer,
                    });
                }
                else {
                    console.log("local user id or chat id undefined");
                }
                // handles.reRenderComponent();
            }
        },
        feedOnOffer: async (thisProps: appSocketHandleOfferProps) => {
            refs.current.peer = {
                ...refs.current.peer,
                conn: new RTCPeerConnection(peerConfig),
            };
            
            // console.log('handle-offer', thisProps.stream.getTracks());
            thisProps.streams?.local?.getTracks().forEach((track) => {
                if(thisProps.streams?.local) refs.current.peer?.conn?.addTrack(track, thisProps.streams.local);
            })

            if(refs.current.peer.conn){
                refs.current.peer.conn.oniceconnectionstatechange = () => {
                    const connState = refs.current.peer?.conn?.iceConnectionState;
                    if(connState === 'disconnected'){
                        console.warn('handle-offer-state-changed, Connection lost. Attempting to reconnect...');
                        if(refs.current.peer?.call?.id){
                            handles.callDisconnected({
                                callId: refs.current.peer.call.id,
                                timestamp: getPresentTime().unix.milisec,
                            });
                        }
                        handles.reconnect({
                            chatId: thisProps.chatId,
                            // receiverId: thisProps.receiverId,
                        });
                    }
                    else if(connState === 'connected'){
                        refs.current.peer = {
                            ...refs.current.peer,
                            call: {
                                ...refs.current.peer?.call,
                                status: 'connected',
                            },
                        };
                        if(!timer.status) handles.startTimer();
                        if(refs.current.peer?.call?.id){
                            handles.callConnected({
                                callId: refs.current.peer.call.id,
                                timestamp: getPresentTime().unix.milisec,
                            });
                        }
                    }

                    console.log('handle-offer-state-changed', connState);
                }
                refs.current.peer.conn.onicecandidate = (e) => {
                    if(e.candidate){
                        if(localUserRef.current?.id && thisProps.chatId){
                            console.log('handle-offer onicecandidate')
                            handles.signal({
                                chatId: thisProps.chatId,
                                // receiverId: thisProps.receiverId,
                                signal: {
                                    candidate: e.candidate,
                                },
                            });
                        }
                        else {
                            console.log("local user id or chat id undefined");
                        }
                    }
                }
                refs.current.peer.conn.ontrack = (e) => {
                    if(refs.current.peer){
                        refs.current.peer.remote = {
                            ...refs.current.peer.remote,
                            stream: e.streams[0],
                        };
                    }
                    else {
                        console.log("peer undefined");
                    }
                }

                const offer = new RTCSessionDescription(thisProps.offer);
                await refs.current.peer?.conn.setRemoteDescription(offer);
                refs.current.peer.remote = {
                    ...refs.current.peer.remote,
                    descriptionIsSet: true,
                };

                refs.current.peer.remote.pendingIceCandidates?.forEach(candidate =>
                    refs.current.peer?.conn?.addIceCandidate(candidate).catch((err) => {
                        console.log(err);
                    })
                );
                refs.current.peer.remote.pendingIceCandidates = [];

                const answer = await refs.current.peer?.conn.createAnswer();
                await refs.current.peer?.conn.setLocalDescription(answer);
                if(localUserRef.current?.id && thisProps.chatId){
                    console.log('handle-offer create-answer')
                    handles.signal({
                        chatId: thisProps.chatId,
                        // receiverId: thisProps.receiverId,
                        signal: answer,
                    });
                }
                else {
                    console.log("local user id or chat id undefined");
                }
            }
        },
        feedOnAnswer: async (thisProps: appSocketHandleAnswerProps) => {
            const offer = new RTCSessionDescription(thisProps.answer);
            await refs.current.peer?.conn?.setRemoteDescription(offer);
            refs.current.peer = {
                ...refs.current.peer,
                remote: {
                    ...refs.current.peer?.remote,
                    descriptionIsSet: true,
                },
            };
            
            refs.current.peer.remote?.pendingIceCandidates?.forEach(candidate =>
                refs.current.peer?.conn?.addIceCandidate(candidate).catch(console.log)
            );
            refs.current.peer = {
                ...refs.current.peer,
                remote: {
                    ...refs.current.peer?.remote,
                    pendingIceCandidates: [],
                },
            };
        },
        reconnect: async (thisProps: appSocketHandleReconnectPeerProps) => {
            try {
                if(localUserRef.current?.id && thisProps.chatId){
                    if(refs.current.peer?.conn?.localDescription){
                        const offer = await refs.current.peer?.conn?.createOffer({ iceRestart: true });
                        await refs.current.peer?.conn?.setLocalDescription(offer);
                    
                        // Signal the new offer to the remote peer
                        handles.signal({
                            chatId: thisProps.chatId,
                            // receiverId: thisProps.receiverId,
                            signal: {
                                ...refs.current.peer?.conn.localDescription,
                                type: 'offer',
                                sdp: refs.current.peer?.conn.localDescription.sdp,
                            },
                        });
                        console.log('Reconnection attempt initiated.');
                    }
                    else {
                        console.log('no local description');
                    }
                }
                else {
                    console.log("local user id or chat id undefined");
                }
            }
            catch (error) {
              console.log('Error during ICE restart:', error);
            }
        },
        reRenderComponent: () => {
            reRender.trigger();
            // reRender[1](getNewKey());
        },
        runTimeoutly: (callback: () => void) => {//runs the callback after sometime;
            setTimeout(callback, 2000);
        },
        destroyPeer: (thisProps?: appSocketHandleDestroyPeerProps) => {
            if(refs.current.peer){
                refs.current.peer?.conn?.close();
                refs.current.peer?.local?.stream?.getTracks().forEach((track) => track.stop());
                refs.current.peer?.remote?.stream?.getTracks().forEach((track) => track.stop());
                
                refs.current.peer.call = {
                    ...refs.current.peer.call,
                    status: thisProps?.status || 'ended',
                };
                refs.current.peer.local = {
                    ...refs.current.peer.local,
                    stream: undefined,
                };
                refs.current.peer.remote = {
                    ...refs.current.peer.remote,
                    stream: undefined,
                };
                handles.reRenderComponent();
            }
        },
        toggleLocalMicMute: () => {
            if(refs.current.peer?.local?.stream){
                const enabled = refs.current.peer.local.audio?.enabled ? false : true;
                refs.current.peer.local.stream.getAudioTracks().forEach(track => {
                    track.enabled = enabled;
                });
                refs.current.peer.local.audio = {
                    ...refs.current.peer.local.audio,
                    enabled,
                };
                handles.reRenderComponent();
            }
        },
        toggleLocalVideoMute: () => {
            if(refs.current.peer?.local?.stream){
                const enabled = refs.current.peer.local.video?.enabled ? false : true;
                refs.current.peer.local.stream.getVideoTracks().forEach(track => {
                    track.enabled = enabled;
                });
                refs.current.peer.local.video = {
                    ...refs.current.peer.local.video,
                    enabled,
                };
                handles.reRenderComponent();
            }
        },
        getNavigatorDevices: async () => {
            const devices = await navigator?.mediaDevices?.enumerateDevices() as MediaDeviceInfo[] | undefined;
            return devices;
        },
        getAudioInputDevices: async () => {
            const devices = await handles.getNavigatorDevices();
            const inputs = devices?.filter(device => device.kind === 'audioinput');
            return inputs;
        },
        getAudioOutputDevices: async () => {
            const devices = await handles.getNavigatorDevices();
            const outputs = devices?.filter(device => device.kind === 'audiooutput');
            return outputs;
        },
        changeAudioInput: async () => {
            //get inputs;
            //select an input;
            //stop the current audio track;
            //request new audio track with getUserMedia, with the input deviceId as a constraint;
            // const newStream = await navigator.mediaDevices.getUserMedia({
            //     audio: { deviceId: selectedInput ? { exact: selectedInput } : undefined },
            //     video: camOff ? false : true,
            // });
        },
        changeAudioOutput: async () => {
            const audioOutputs = await handles.getAudioOutputDevices();
            const audioElement = document.querySelector(`.${__classSelectors.localStreamVideo}`) as HTMLAudioElement | HTMLVideoElement | undefined;
            if(audioOutputs?.length && audioElement && 'setSinkId' in audioElement){
                const selectedOutput = audioOutputs[2];
                // console.log({selectedOutput, audioElement})
                if(selectedOutput?.deviceId) audioElement.setSinkId(selectedOutput.deviceId);
            }
            // console.log({audioOutputs})
        },


        startTimer: () => {
            timer.start();
        },
        pauseTimer: () => {
            timer.pause();
        },
        resumeTimer: () => {
            timer.resume();
        },
        endTimer: () => {
            timer.stop();
            timer.reset();
        },

        setRefsTempRouteUser: (tempRouteUser: appSocketRefs['tempRouteUser']) => {
            refs.current.tempRouteUser = tempRouteUser;
        },
    };
    
    useEffect(() => {
        socketHook.setCallbacks({
            onAuth: handles.onAuth,
            onSendMessage: handles.onSendMessage,
            onNewMessage: handles.onNewMessage,
            onGetMessages: handles.onGetMessages,
            onUpdateMessages: handles.onUpdateMessages,
            
            onSendSupportMessage: handles.onSendSupportMessage,
            onNewSupportMessage: handles.onNewSupportMessage,
            onGetSupportMessages: handles.onGetSupportMessages,
            onUpdateSupportMessages: handles.onUpdateSupportMessages,

            onCallUser: handles.onCallUser,
            onUserCalling: handles.onUserCalling,
            onAcceptCall: handles.onAcceptCall,
            onCallAccepted: handles.onCallAccepted,
            onRejectCall: handles.onRejectCall,
            onCallRejected: handles.onCallRejected,
            onEndCall: handles.onEndCall,
            onCallEnded: handles.onCallEnded,
            onSignal: handles.onSignal,
            onAlert: handles.onAlert,
            onUpdateAlerts: handles.onUpdateAlerts,
            onUpdateChats: handles.onUpdateChats,
            onUpdateUser: handles.onUpdateUser,
            // onNewMessageRequest: handles.onNewMessageRequest,
            // onMessageRequestAccepted: handles.onMessageRequestAccepted,
            // onMessageRequestRejected: handles.onMessageRequestRejected,
        });

        // if(localUserRef.current?.id && !socketHook.status.initialized){
        if(localUserRef.current?.id && !socketHook.status?.initialized){
            socketHook.initialize();
        }
    }, [localUserRef.current?.id]);
    useEffect(() => {
        if(timer.status === 'playing' && refs.current.peer?.call && refs.current.peer.onCall){
            refs.current.peer.call.duration = timer.seconds;
        }
    }, [timer.seconds]);
    useEffect(() => {
        dashboardRef.current = dashboard;
    }, [dashboard])
    useEffect(() => {
        localUserRef.current = localUser;
    }, [localUser])
    
    return {
        ...socketHook,
        ...handles,
        // requestResponses: requestResponses.current,
        // requestResponses,
        // callState,
        ...refs.current,
        // refs: refs.current,
    };
}