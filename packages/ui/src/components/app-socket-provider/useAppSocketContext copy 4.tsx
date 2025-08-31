// 'use client';

// import { useEffect, useRef } from "react";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { useWebSocket } from "../web-socket/useWebSocket";
// import { wsAcceptCallRequestBody, wsAcceptCallRespData, wsAuthRespData, wsCallAcceptedRespData, wsCallEndedRespData, wsCallRejectedRespData, wsCallUserRequestBody, wsCallUserRespData, wsEndCallRequestBody, wsEndCallRespData, wsEventAction, wsGetMessagesProps, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRejectCallRequestBody, wsRejectCallRespData, wsRequestResponseProps, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData, wsSignalRequestBody, wsSignalRespData, wsUpdateMessagesRequestBody, wsUpdateMessagesRespData, wsUserCallingRespData } from "../../utils/types/ws";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { Socket } from "socket.io-client";
// import { appSocketHandleAnswerProps, appSocketHandleCreateOfferProps, appSocketHandleDestroyPeerProps, appSocketHandleEndCallProps, appSocketHandleOfferProps, appSocketHandleReconnectPeerProps, appSocketRefs } from "../../utils/types/app-socket";
// import { __wsUrls } from "../../utils/constants/ws-urls";
// import { callType } from "../../utils/types/call";
// import { userProps } from "../../utils/types/user";
// import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";

// export type AppSocketContextType = ReturnType<typeof useAppSocketContext> | undefined;
// export const useAppSocketContext = () => {
//     const dashboard = useDashboard();
//     const localUser = useLocalUser();
//     const socketHook = useWebSocket();
//     // const socket = socketHook.socket;
//     // const requestResponses = useRef<wsRequestResponses>({});
//     // const [requestResponses, setRequestResponses] = useState<wsRequestResponses>({});
//     // const [callState, setCallState] = useState<appSocketCallState>({});
//     // const reRender = useState<string | undefined>(undefined);
//     const reRender = useRerenderComponent();
//     const refs = useRef<appSocketRefs>({});
//     // const toast = useToastMessage();
//     const peerConfig: RTCConfiguration = {
//       iceServers: [{ urls: __wsUrls.stunServer() }],
//     };
    
//     const handles = {
//         setReqResp: (action: wsEventAction, actionProps?: wsRequestResponseProps) => {
//             if(refs.current.requests) refs.current.requests[action] = actionProps;
//             else refs.current.requests = {[action]: actionProps};
//             // requestResponses.current[action] = {loading};
//             // setRequestResponses(prev => ({
//             //     ...prev,
//             //     [action]: actionProps,
//             // }));
//         },
//         onAuth: (response?: wsResponse<wsAuthRespData>) => {
//             console.log('auth', {response});
//             if(response?.success && response.data?.id === localUser?.id){
//                 socketHook.updateStatus({
//                     authed: true,
//                     state: 'connected',
//                 })
//                 setTimeout(() => {
//                     socketHook.ping();
//                 }, 2000);
//                 // socketHook.setStatus(prev => ({
//                 //     ...prev,
//                 //     authed: true,
//                 //     state: 'connected',
//                 // }));
//             }
//         },
//         sendMessage: (body: wsSendMessageRequestBody) => {
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'send-message',
//             });
//             handles.setReqResp('send-message', {loading: true});
//             handles.reRenderComponent();
//         },
//         onSendMessage: (response?: wsResponse<wsSendMessageRespData>) => {
//             console.log('send-message', {response});

//             handles.setReqResp('send-message', {loading: false});
//             if(response?.data?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: response.data.chatId,
//                     messages: response.data.message ? [response.data.message] : undefined,
//                     asNewItems: true,
//                 });
//             }
//             handles.reRenderComponent();
//         },
//         onNewMessage: (response?: wsResponse<wsNewMessageRespData>) => {
//             console.log('new-message', {response});

//             if(response?.data?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: response.data.chatId,
//                     messages: response.data.message ? [response.data.message] : undefined,
//                     asNewItems: true,
//                 });
//             }
//         },
//         getMessages: (thisProps: wsGetMessagesProps) => {
//             const chat = (thisProps.chatId ? dashboard?.chats.records?.[thisProps.chatId] : undefined);
//             const body: wsGetMessagesRequestBody = {
//                 action: 'get-messages',
//                 chatId: thisProps.chatId,
//                 pageSize: 20,
//                 lastEvaluatedKey: chat?.messages?.pagination?.lastEvaluatedKey,
//             };
//             handles.setReqResp('get-messages', {loading: true});
//             handles.reRenderComponent();
//             socketHook.sendToSocket(body);
//         },
//         onGetMessages: (response?: wsResponse<wsGetMessagesRespData>) => {
//             console.log('get-messages', {response});
//             handles.setReqResp('get-messages', {loading: false});
            
//             if(response?.data?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: response.data.chatId,
//                     messages: response.data.messages,
//                     pagination: response?.pagination,
//                 });
//             }
//             handles.reRenderComponent();
//         },
//         updateMessages: (body: wsUpdateMessagesRequestBody) => {//update messages props, such as their read receipts;
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'update-messages',
//             });
//             handles.setReqResp('update-messages', {loading: true});
//             handles.reRenderComponent();
//         },
//         onUpdateMessages: (response?: wsResponse<wsUpdateMessagesRespData>) => {//update messages props only;
//             console.log('update-messages', {response});

//             handles.setReqResp('update-messages', {loading: false});
//             if(response?.data?.chatId){
//                 dashboard?.chats.updateMessages({
//                     chatId: response.data.chatId,
//                     messagesMap: response.data.messagesMap,
//                 });
//             }
//             handles.reRenderComponent();
//         },
//         signal: (body: wsSignalRequestBody) => {
//             // console.log({signalLoading: refs.current.requests?.signal?.loading, body});
//             // if(!refs.current.requests?.signal?.loading){
//             // }
//             // console.log(refs.current.requests?.signal?.loading, {body})
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'signal',
//             });
//             // handles.setReqResp('signal', {loading: true});
//             // handles.reRenderComponent();
//         },
//         onSignal: async (response?: wsResponse<wsSignalRespData>) => {
//             console.log('signal', {response});

//             if(response?.data?.signal?.type === 'offer'){
//                 let stream = refs.current.peer?.local?.stream;
//                 if(!stream) stream = await handles.initializeLocalStream(refs.current.peer?.call?.type);
//                 if(stream){
//                     await handles.handleOffer({
//                         offer: response?.data?.signal as RTCSessionDescriptionInit,
//                         streams: {
//                             local: stream,
//                         },
//                         chatId: response?.data?.chatId,
//                     });
//                 }
//                 else {
//                     console.log("local user stream undefined");
//                 }
//             }
//             else if(response?.data?.signal?.type === 'answer'){
//                 await handles.handleAnswer({
//                     answer: response?.data?.signal as RTCSessionDescriptionInit,
//                 });
//             }

//             if(response?.data?.signal?.candidate){
//                 const iceCandidate = new RTCIceCandidate(response?.data?.signal.candidate);
//                 // console.log("signal", thisProps.signal.candidate, peerConn.current)
//                 // await refs.current.peer?.conn?.addIceCandidate(iceCandidate);
//                 if(refs.current.peer?.remote?.descriptionIsSet){
//                     await refs.current.peer?.conn?.addIceCandidate(iceCandidate);
//                 }
//                 else {
//                     refs.current.peer?.remote?.pendingIceCandidates?.push(iceCandidate);
//                 }
//             }

//             // handles.setReqResp('signal', {loading: false});
//             handles.reRenderComponent();
            
//         },
//         callUser: async (body: wsCallUserRequestBody, receiver: userProps | undefined) => {
//             const localStream = await handles.initializeLocalStream(body.type);
//             refs.current.peer = {
//                 onCall: true,
//                 call: {
//                     status: 'calling',
//                     type: body.type,
//                     user: receiver,
//                 },
//                 local: {
//                     stream: localStream,
//                 },
//             };
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'call-user',
//             });
//             handles.setReqResp('call-user', {loading: true});
//             handles.reRenderComponent();
//         },
//         onCallUser: (response?: wsResponse<wsCallUserRespData>) => {
//             console.log('call-user', {response});

//             if(response?.data?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: response.data.call,
//                 };
//             }

//             handles.setReqResp('call-user', {loading: false});
//             handles.reRenderComponent();

//             if(refs.current.peer?.call?.status !== 'ringing'){
//                 handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
//                     if(refs.current.peer){
//                         refs.current.peer.call = {
//                             ...refs.current.peer.call,
//                             status: refs.current.peer?.call?.status || 'ended',
//                         };
//                         // refs.current.peer.onCall = undefined;
//                         refs.current.peer = undefined;
//                         handles.reRenderComponent();
//                     }
//                 });
//                 if(refs.current.peer?.call?.id){
//                     refs.current.peer = {
//                         ...refs.current.peer,
//                         call: {
//                             ...refs.current.peer?.call,
//                             status: refs.current.peer?.call?.status || 'ended',
//                         },
//                     };
//                     handles.setReqResp('end-call', {loading: true});
//                 }
//                 handles.destroyPeer({status: refs.current.peer?.call?.status}); 
//             }
//         },
//         onUserCalling: (response?: wsResponse<wsUserCallingRespData>) => {
//             console.log('user-calling', {response});

//             if(response?.data?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: response.data.call,
//                 };
//             }
//             handles.reRenderComponent();
//         },
//         acceptCall: async () => {
//             if(refs.current.peer?.call?.id){
//                 const body: wsAcceptCallRequestBody = {
//                     callId: refs.current.peer?.call?.id,
//                 };
//                 socketHook.sendToSocket({
//                     ...body,
//                     action: 'accept-call',
//                 });
//                 const localStream = await handles.initializeLocalStream(refs.current.peer?.call?.type);
//                 refs.current.peer = {
//                     onCall: true,
//                     call: refs.current.peer?.call,
//                     local: {
//                         stream: localStream,
//                     },
//                 };
//                 handles.setReqResp('accept-call', {loading: true});
//                 handles.reRenderComponent();
//             }
//         },
//         onAcceptCall: (response?: wsResponse<wsAcceptCallRespData>) => {
//             console.log('accept-call', {response});

//             if(response?.data?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: response.data.call,
//                 };

//                 //can now send your signal to the caller;
//                 // handles.createOffer({
//                 //     chatId: response?.data?.chatId,
//                 //     receiverId: response?.data?.call?.user?.id,
//                 // });
//             }

//             handles.setReqResp('accept-call', {loading: false});
//             handles.reRenderComponent();
//         },
//         onCallAccepted: async (response?: wsResponse<wsCallAcceptedRespData>) => {
//             console.log('call-accepted', {response});

//             if(response?.data?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: response.data.call,
//                 };

//                 //can now send your signal to the receiver;
//                 await handles.createOffer({
//                     chatId: response?.data?.chatId,
//                     receiverId: response?.data?.call?.user?.id,
//                 });
//             }
//             handles.reRenderComponent();
//         },
//         rejectCall: () => {
//             if(refs.current.peer?.call?.id){
//                 const body: wsRejectCallRequestBody = {
//                     callId: refs.current.peer?.call?.id,
//                 };
//                 socketHook.sendToSocket({
//                     ...body,
//                     action: 'reject-call',
//                 });
//                 refs.current.peer = {
//                     call: {
//                         ...refs.current.peer?.call,
//                         status: 'rejected',
//                     },
//                 };
//                 handles.setReqResp('reject-call', {loading: true});
//                 handles.reRenderComponent();
//             }
//         },
//         onRejectCall: (response?: wsResponse<wsRejectCallRespData>) => {
//             console.log('reject-call', {response});

//             refs.current.peer = undefined;

//             handles.setReqResp('reject-call', {loading: false});
//             handles.reRenderComponent();
//         },
//         onCallRejected: (response?: wsResponse<wsCallRejectedRespData>) => {
//             console.log('call-rejected', {response});

//             if(response?.data?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: response.data.call,
//                 };
//             }
//             handles.endCall({status: response?.data?.call?.status});
//         },
//         endCall: (thisProps?: appSocketHandleEndCallProps) => {
//             handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
//                 if(refs.current.peer){
//                     refs.current.peer.call = {
//                         ...refs.current.peer.call,
//                         status: thisProps?.status || 'ended',
//                     };
//                     // refs.current.peer.onCall = undefined;
//                     refs.current.peer = undefined;
//                     handles.reRenderComponent();
//                 }
//             });
//             if(refs.current.peer?.call?.id){
//                 const body: wsEndCallRequestBody = {
//                     callId: refs.current.peer?.call?.id,
//                 };
//                 socketHook.sendToSocket({
//                     ...body,
//                     action: 'end-call',
//                 });
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: {
//                         ...refs.current.peer?.call,
//                         status: 'ended',
//                     },
//                 };
//                 handles.setReqResp('end-call', {loading: true});
//             }
//             handles.destroyPeer(thisProps);
//         },
//         onEndCall: (response?: wsResponse<wsEndCallRespData>) => {
//             console.log('end-call', {response});

//             // refs.current.peer = undefined;
//             refs.current.peer = {
//                 ...refs.current.peer,
//                 call: {
//                     ...refs.current.peer?.call,
//                     ...response?.data?.call,
//                 },
//             };

//             handles.setReqResp('end-call', {loading: false});
//             handles.reRenderComponent();
//         },
//         onCallEnded: (response?: wsResponse<wsCallEndedRespData>) => {
//             console.log('call-ended', {response});

//             handles.runTimeoutly(() => {//pause-effect before closing the call-screen modal;
//                 if(refs.current.peer){
//                     refs.current.peer.call = {
//                         ...refs.current.peer.call,
//                         status: response?.data?.call?.status || 'ended',
//                     };
//                     // refs.current.peer.onCall = undefined;
//                     refs.current.peer = undefined;
//                     handles.reRenderComponent();
//                 }
//             });
//             if(refs.current.peer?.call){
//                 refs.current.peer = {
//                     ...refs.current.peer,
//                     call: {
//                         ...refs.current.peer?.call,
//                         status: response?.data?.call?.status || 'ended',
//                     },
//                 };
//                 handles.setReqResp('end-call', {loading: true});
//             }
//             handles.destroyPeer({status: response?.data?.call?.status});
//         },
//         onDisconnect: (reason: Socket.DisconnectReason) => {
//             console.log('disconnected', {reason});
//         },


//         initializeLocalStream: async (callType?: callType) => {
//             let stream: MediaStream | undefined;
//             if(localUser?.id){
//                 try {
//                     stream = await navigator.mediaDevices.getUserMedia({
//                         video: callType === 'video' ? true : false,
//                         audio: true,
//                     });
//                     // console.log('tracks', stream.getTracks())
//                 }
//                 catch (error) {
//                     console.log("Failed to get local stream:", error);
//                 }

//                 // refs.current.peer = {
//                 //     ...refs.current.peer,
//                 //     local: {
//                 //         ...refs.current.peer?.local,
//                 //         stream,
//                 //     },
//                 // };
//             }
//             return stream;
//         },
//         createOffer: async (thisProps: appSocketHandleCreateOfferProps) => {
//             refs.current.peer = {
//                 ...refs.current.peer,
//                 conn: new RTCPeerConnection(peerConfig),
//             };

//             // console.log('create-offer', thisProps.stream.getTracks());
//             refs.current.peer.local?.stream?.getTracks().forEach((track) => {
//                 if(refs.current.peer?.local?.stream) refs.current.peer?.conn?.addTrack(track, refs.current.peer.local?.stream);
//             })

//             if(refs.current.peer.conn){
//                 refs.current.peer.conn.oniceconnectionstatechange = () => {
//                     const connState = refs.current.peer?.conn?.iceConnectionState;
//                     if (connState === 'disconnected') {
//                         console.warn('create-offer-state-changed, Connection lost. Attempting to reconnect...');
//                         handles.reconnect({
//                             chatId: thisProps.chatId,
//                             receiverId: thisProps.receiverId,
//                         });
//                     }

//                     console.log('create-offer-state-changed', connState);
//                 }
//                 refs.current.peer.conn.onicecandidate = (e) => {
//                     if(e.candidate){
//                         if(localUser?.id){
//                             if(!refs.current.peer?.local?.isOnIceCandidate){
//                                 console.log('create-offer onicecandidate', e.candidate.address)
                                
//                                 refs.current.peer = {
//                                     ...refs.current.peer,
//                                     local: {
//                                         ...refs.current.peer?.local,
//                                         isOnIceCandidate: true,
//                                     },
//                                 };
//                                 handles.signal({
//                                     chatId: thisProps.chatId,
//                                     receiverId: thisProps.receiverId,
//                                     signal: {
//                                         candidate: e.candidate,
//                                     },
//                                 });
//                             }
//                         }
//                         else {
//                             console.log("local user id undefined");
//                         }
//                     }
//                 }
//                 refs.current.peer.conn.ontrack = (e) => {
//                     if(refs.current.peer){
//                         refs.current.peer.remote = {
//                             ...refs.current.peer.remote,
//                             stream: e.streams[0],
//                         };
//                     }
//                     else {
//                         console.log("peer undefined");
//                     }
//                 }

//                 const offer = await refs.current.peer?.conn.createOffer();
//                 await refs.current.peer.conn.setLocalDescription(offer);
//                 if(localUser?.id){
//                     console.log('create-offer offer')
//                     handles.signal({
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiverId,
//                         signal: offer,
//                     });
//                 }
//                 else {
//                     console.log("local user id undefined");
//                 }
//                 // handles.reRenderComponent();
//             }
//         },
//         handleOffer: async (thisProps: appSocketHandleOfferProps) => {
//             refs.current.peer = {
//                 ...refs.current.peer,
//                 conn: new RTCPeerConnection(peerConfig),
//             };
            
//             // console.log('handle-offer', thisProps.stream.getTracks());
//             thisProps.streams?.local?.getTracks().forEach((track) => {
//                 if(thisProps.streams?.local) refs.current.peer?.conn?.addTrack(track, thisProps.streams.local);
//             })

//             if(refs.current.peer.conn){
//                 refs.current.peer.conn.oniceconnectionstatechange = () => {
//                     const connState = refs.current.peer?.conn?.iceConnectionState;
//                     if (connState === 'disconnected') {
//                         console.warn('handle-offer-state-changed, Connection lost. Attempting to reconnect...');
//                         handles.reconnect({
//                             chatId: thisProps.chatId,
//                             receiverId: thisProps.receiverId,
//                         });
//                     }

//                     console.log('handle-offer-state-changed', connState);
//                 }
//                 refs.current.peer.conn.onicecandidate = (e) => {
//                     if(e.candidate){
//                         if(localUser?.id){
//                             console.log('handle-offer onicecandidate')
//                             handles.signal({
//                                 chatId: thisProps.chatId,
//                                 receiverId: thisProps.receiverId,
//                                 signal: {
//                                     candidate: e.candidate,
//                                 },
//                             });
//                         }
//                         else {
//                             console.log("local user id undefined");
//                         }
//                     }
//                 }
//                 refs.current.peer.conn.ontrack = (e) => {
//                     if(refs.current.peer){
//                         refs.current.peer.remote = {
//                             ...refs.current.peer.remote,
//                             stream: e.streams[0],
//                         };
//                     }
//                     else {
//                         console.log("peer undefined");
//                     }
//                 }

//                 const offer = new RTCSessionDescription(thisProps.offer);
//                 await refs.current.peer?.conn.setRemoteDescription(offer);
//                 refs.current.peer.remote = {
//                     ...refs.current.peer.remote,
//                     descriptionIsSet: true,
//                 };

//                 refs.current.peer.remote.pendingIceCandidates?.forEach(candidate =>
//                     refs.current.peer?.conn?.addIceCandidate(candidate).catch((err) => {
//                         console.log(err);
//                     })
//                 );
//                 refs.current.peer.remote.pendingIceCandidates = [];

//                 const answer = await refs.current.peer?.conn.createAnswer();
//                 await refs.current.peer?.conn.setLocalDescription(answer);
//                 if(localUser?.id){
//                     console.log('handle-offer create-answer')
//                     handles.signal({
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiverId,
//                         signal: answer,
//                     });
//                 }
//                 else {
//                     console.log("local user id undefined");
//                 }
//             }
//         },
//         handleAnswer: async (thisProps: appSocketHandleAnswerProps) => {
//             const offer = new RTCSessionDescription(thisProps.answer);
//             await refs.current.peer?.conn?.setRemoteDescription(offer);
//             refs.current.peer = {
//                 ...refs.current.peer,
//                 remote: {
//                     ...refs.current.peer?.remote,
//                     descriptionIsSet: true,
//                 },
//             };
            
//             refs.current.peer.remote?.pendingIceCandidates?.forEach(candidate =>
//                 refs.current.peer?.conn?.addIceCandidate(candidate).catch(console.log)
//             );
//             refs.current.peer = {
//                 ...refs.current.peer,
//                 remote: {
//                     ...refs.current.peer?.remote,
//                     pendingIceCandidates: [],
//                 },
//             };
//         },
//         reconnect: async (thisProps: appSocketHandleReconnectPeerProps) => {
//             try {
//                 if(localUser?.id){
//                     if(refs.current.peer?.conn?.localDescription){
//                         const offer = await refs.current.peer?.conn?.createOffer({ iceRestart: true });
//                         await refs.current.peer?.conn?.setLocalDescription(offer);
                    
//                         // Signal the new offer to the remote peer
//                         handles.signal({
//                             chatId: thisProps.chatId,
//                             receiverId: thisProps.receiverId,
//                             signal: {
//                                 type: 'offer',
//                                 sdp: (refs.current.peer?.conn.localDescription as unknown) as string,
//                             },
//                         });
//                         console.log('Reconnection attempt initiated.');
//                     }
//                     else {
//                         console.log('no local description');
//                     }
//                 }
//                 else {
//                     console.log("local user id undefined");
//                 }
//             }
//             catch (error) {
//               console.log('Error during ICE restart:', error);
//             }
//         },
//         reRenderComponent: () => {
//             reRender.trigger();
//             // reRender[1](getNewKey());
//         },
//         runTimeoutly: (callback: () => void) => {//runs the callback after sometime;
//             setTimeout(callback, 2000);
//         },
//         destroyPeer: (thisProps?: appSocketHandleDestroyPeerProps) => {
//             if(refs.current.peer){
//                 refs.current.peer?.conn?.close();
//                 refs.current.peer?.local?.stream?.getTracks().forEach((track) => track.stop());
//                 refs.current.peer?.remote?.stream?.getTracks().forEach((track) => track.stop());
                
//                 refs.current.peer.call = {
//                     ...refs.current.peer.call,
//                     status: thisProps?.status || 'ended',
//                 };
//                 refs.current.peer.local = {
//                     ...refs.current.peer.local,
//                     stream: undefined,
//                 };
//                 refs.current.peer.remote = {
//                     ...refs.current.peer.remote,
//                     stream: undefined,
//                 };
//                 handles.reRenderComponent();
//             }
//         },
//     };
    
//     useEffect(() => {
//         socketHook.setCallbacks({
//             onAuth: handles.onAuth,
//             onSendMessage: handles.onSendMessage,
//             onNewMessage: handles.onNewMessage,
//             onGetMessages: handles.onGetMessages,
//             onUpdateMessages: handles.onUpdateMessages,
//             onCallUser: handles.onCallUser,
//             onUserCalling: handles.onUserCalling,
//             onAcceptCall: handles.onAcceptCall,
//             onCallAccepted: handles.onCallAccepted,
//             onRejectCall: handles.onRejectCall,
//             onCallRejected: handles.onCallRejected,
//             onEndCall: handles.onEndCall,
//             onCallEnded: handles.onCallEnded,
//             onSignal: handles.onSignal,
//         });

//         // if(localUser?.id && !socketHook.status.initialized){
//         if(localUser?.id && !socketHook.status?.initialized){
//             socketHook.initialize();
//         }
//     }, [localUser?.id]);
    
//     return {
//         ...socketHook,
//         ...handles,
//         // requestResponses: requestResponses.current,
//         // requestResponses,
//         // callState,
//         ...refs.current,
//     };
// }