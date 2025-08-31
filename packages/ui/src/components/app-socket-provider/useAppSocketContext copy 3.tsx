// 'use client';

// import { useEffect, useState } from "react";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { useWebSocket } from "../web-socket/useWebSocket";
// import { wsAuthRespData, wsEventAction, wsGetMessagesProps, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRequestResponseProps, wsRequestResponses, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData, wsSignalRequestBody, wsSignalRespData, wsUpdateMessagesRequestBody, wsUpdateMessagesRespData } from "../../utils/types/ws";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { Socket } from "socket.io-client";
// import { appSocketCallState, appSocketCallUserHandleProps, appSocketCreateOfferProps, appSocketHandleAnswerProps, appSocketHandleOfferProps, appSocketHandleReconnectPeerProps } from "../../utils/types/app-socket";
// import { callType } from "../../utils/types/call";
// import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
// import { __wsUrls } from "../../utils/constants/ws-urls";

// export type AppSocketContextType = ReturnType<typeof useAppSocketContext> | undefined;
// export const useAppSocketContext = () => {
//     const dashboard = useDashboard();
//     const localUser = useLocalUser();
//     const socketHook = useWebSocket();
//     // const socket = socketHook.socket;
//     // const requestResponses = useRef<wsRequestResponses>({});
//     const [requestResponses, setRequestResponses] = useState<wsRequestResponses>({});
//     const [callState, setCallState] = useState<appSocketCallState>({});
//     // const refs = useRef<appSocketRefs>({});
//     const toast = useToastMessage();
//     const peerConfig: RTCConfiguration = {
//       iceServers: [{ urls: __wsUrls.stunServer() }],
//     };
    
//     const handles = {
//         setReqResp: (action: wsEventAction, actionProps?: wsRequestResponseProps) => {
//             // requestResponses.current[action] = {loading};
//             setRequestResponses(prev => ({
//                 ...prev,
//                 [action]: actionProps,
//             }));
//         },
//         initializeLocalStream: async (type?: callType) => {
//             let stream: MediaStream | undefined;
//             if(localUser?.id){
//                 try {
//                     stream = await navigator.mediaDevices.getUserMedia({
//                         video: type === 'video' ? true : false,
//                         audio: true,
//                     });
//                     // console.log('tracks', stream.getTracks())
//                 }
//                 catch (error) {
//                     console.log("Failed to get local stream:", error);
//                 }

//                 // setCallState(prev => ({
//                 //     ...prev,
//                 //     streams: {
//                 //         ...prev.streams,
//                 //         local: stream,
//                 //     },
//                 // }));
//             }
            
//             return stream;
//         },
//         onAuth: (response?: wsResponse<wsAuthRespData>) => {
//             console.log('auth', {response});
//             if(response?.success && response.data?.id === localUser?.id){
//                 socketHook.setStatus(prev => ({
//                     ...prev,
//                     authed: true,
//                     state: 'connected',
//                 }));
//             }
//         },
//         sendMessage: (body: wsSendMessageRequestBody) => {
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'send-message',
//             });
//             handles.setReqResp('send-message', {loading: true});
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
//         },
//         updateMessages: (body: wsUpdateMessagesRequestBody) => {//update messages props, such as their read receipts;
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'update-messages',
//             });
//             handles.setReqResp('update-messages', {loading: true});
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
//         },
//         signal: (body: wsSignalRequestBody) => {
//             socketHook.sendToSocket({
//                 ...body,
//                 action: 'call-signal',
//             });
//             handles.setReqResp('call-signal', {loading: true});
//         },
//         onSignal: async (response?: wsResponse<wsSignalRespData>) => {
//             console.log('call-signal', {response});
//             handles.setReqResp('call-signal', {loading: false});
            
//             if(response?.data?.chatId){
//                 if(response.data.signal?.type === 'offer'){
//                     if(callState.streams?.local){
//                         await handles.handleOffer({
//                             offer: response.data.signal as RTCSessionDescriptionInit,
//                             streams: {
//                                 local: callState.streams?.local,
//                             },
//                             chatId: response.data.chatId,
//                         });
//                     }
//                     else {
//                         console.log("local user id undefined");
//                     }
//                 }
//                 else if(response.data.signal?.type === 'answer'){
//                     await handles.handleAnswer({
//                         answer: response.data.signal as RTCSessionDescriptionInit,
//                         peerConn: callState.peerConn,
//                     });
//                 }

//                 if(response.data.signal?.candidate){
//                     const iceCandidate = new RTCIceCandidate(response.data.signal.candidate);
//                     // console.log("signal", thisProps.signal.candidate, peerConn.current)
//                     await callState.peerConn?.addIceCandidate(iceCandidate);
//                 }
//             }
//         },
//         reconnectPeerSignal: async (thisProps: appSocketHandleReconnectPeerProps) => {
//             try {
//                 if(thisProps.peerConn?.localDescription){
//                     const offer = await thisProps.peerConn?.createOffer({ iceRestart: true });
//                     await thisProps.peerConn?.setLocalDescription(offer);
                
//                     // Signal the new offer to the remote peer
//                     handles.signal({
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiverId,
//                         signal: {
//                             type: 'offer',
//                             sdp: (thisProps.peerConn.localDescription as unknown) as string,
//                         },
//                     });
//                     console.log('Reconnection attempt initiated.');
//                 }
//                 else {
//                     console.log('no local description');
//                 }
//             }
//             catch (error) {
//               console.log('Error during ICE restart:', error);
//             }
//         },
//         createOffer: async (thisProps: appSocketCreateOfferProps) => {
//             thisProps.peerConn = new RTCPeerConnection(peerConfig);
//             // console.log('create-offer', thisProps.stream.getTracks());
//             thisProps.streams?.local?.getTracks().forEach((track) => {
//                 if(thisProps.streams?.local) thisProps.peerConn?.addTrack(track, thisProps.streams.local);
//             })

//             thisProps.peerConn.oniceconnectionstatechange = () => {
//                 const connState = thisProps.peerConn?.iceConnectionState;
//                 if (connState === 'disconnected') {
//                     console.warn('create-offer-state-changed, Connection lost. Attempting to reconnect...');
//                     handles.reconnectPeerSignal({
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiverId,
//                     });
//                 }

//                 console.log('create-offer-state-changed', connState);
//             }
//             thisProps.peerConn.onicecandidate = (e) => {
//                 if(e.candidate){
//                     if(localUser?.id){
//                         handles.signal({
//                             chatId: thisProps.chatId,
//                             receiverId: thisProps.receiverId,
//                             signal: {
//                                 candidate: e.candidate,
//                             },
//                         });
//                     }
//                     else {
//                         console.log("local user id undefined");
//                     }
//                 }
//             }
//             thisProps.peerConn.ontrack = (e) => {
//                 if(thisProps.streams?.remote){
//                     thisProps.streams.remote = e.streams[0];
//                 }
//                 else {
//                     console.log("remote peer undefined");
//                 }
//             }

//             const offer = await thisProps.peerConn.createOffer();
//             await thisProps.peerConn.setLocalDescription(offer);
//             if(localUser?.id){
//                 handles.signal({
//                     chatId: thisProps.chatId,
//                     receiverId: thisProps.receiverId,
//                     signal: offer,
//                 });
//             }
//             else {
//                 console.log("local user id undefined");
//             }
//         },
//         handleOffer: async (thisProps: appSocketHandleOfferProps) => {
//             thisProps.peerConn = new RTCPeerConnection(peerConfig);
//             // console.log('handle-offer', thisProps.stream.getTracks());
//             thisProps.streams?.local?.getTracks().forEach((track) => {
//                 if(thisProps.streams?.local) thisProps.peerConn?.addTrack(track, thisProps.streams?.local);
//             })

//             thisProps.peerConn.oniceconnectionstatechange = () => {
//                 const connState = thisProps.peerConn?.iceConnectionState;
//                 if (connState === 'disconnected') {
//                     console.warn('handle-offer-state-changed, Connection lost. Attempting to reconnect...');
//                     handles.reconnectPeerSignal({
//                         peerConn: thisProps.peerConn,
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiverId,
//                     });
//                 }

//                 console.log('handle-offer-state-changed', connState);
//             }
//             thisProps.peerConn.onicecandidate = (e) => {
//                 if(e.candidate){
//                     if(localUser?.id){
//                         handles.signal({
//                             chatId: thisProps.chatId,
//                             receiverId: thisProps.receiverId,
//                             signal: {
//                                 candidate: e.candidate,
//                             },
//                         });
//                     }
//                     else {
//                         console.log("local user id undefined");
//                     }
//                 }
//             }
//             thisProps.peerConn.ontrack = (e) => {
//                 if(thisProps.streams){
//                     thisProps.streams.remote = e.streams[0];
//                 }
//                 else {
//                     console.log("remote peer undefined");
//                 }
//             }

//             const offer = new RTCSessionDescription(thisProps.offer);
//             await thisProps.peerConn.setRemoteDescription(offer);
//             const answer = await thisProps.peerConn.createAnswer();
//             await thisProps.peerConn.setLocalDescription(answer);
//             if(localUser?.id){
//                 handles.signal({
//                     chatId: thisProps.chatId,
//                     receiverId: thisProps.receiverId,
//                     signal: answer,
//                 });
//             }
//             else {
//                 console.log("local user id undefined");
//             }
//         },
//         handleAnswer: async (thisProps: appSocketHandleAnswerProps) => {
//             const offer = new RTCSessionDescription(thisProps.answer);
//             await thisProps.peerConn?.setRemoteDescription(offer);
//         },
//         callUser: async (thisProps: appSocketCallUserHandleProps) => {
//             const localStream = await handles.initializeLocalStream(thisProps.type);
//             setCallState(prev => {
//                 if(!prev.onCall){
//                     handles.createOffer({
//                         peerConn: prev.peerConn,
//                         chatId: thisProps.chatId,
//                         receiverId: thisProps.receiver?.id,
//                         streams: {
//                             local: localStream,
//                         },
//                     });

//                     return {
//                         onCall: true,
//                         status: 'calling',
//                         type: thisProps.type,
//                         receiver: thisProps.receiver,
//                         chatId: thisProps.chatId,
//                         streams: {
//                             ...prev.streams,
//                             local: localStream,
//                         },
//                     }
//                 }
//                 else {
//                     const message = `seems you're still on a call`;
//                     toast.warn(message);
//                     console.log(message);
//                 }

//                 return {...prev};
//             });
//         },
//         endCall: () => {
//             setCallState(prev => {
//                 if(prev.status !== 'ended'){
//                     setTimeout(() => {//pause-effect before closing the call-screen modal;
//                         setCallState(prev2 => ({
//                             ...prev2,
//                             status: 'ended',
//                             onCall: false,
//                         }))
//                     }, 2000);
//                 }

//                 prev.peerConn?.close();
//                 prev.streams?.local?.getTracks().forEach((track) => track.stop());
//                 prev.streams?.remote?.getTracks().forEach((track) => track.stop());

//                 return {
//                     ...prev,
//                     status: 'ended',
//                     streams: undefined,
//                     peerConn: undefined,
//                 }
//             });
//         },
//         onDisconnect: (reason: Socket.DisconnectReason) => {
//             console.log('disconnected', {reason});
//         },
//     };
    
//     useEffect(() => {
//         socketHook.onMessageCallbacks.current = {
//             onAuth: handles.onAuth,
//             onSendMessage: handles.onSendMessage,
//             onNewMessage: handles.onNewMessage,
//             onGetMessages: handles.onGetMessages,
//             onUpdateMessages: handles.onUpdateMessages,
//         };

//         if(localUser?.id && !socketHook.status.initialized){
//             socketHook.initialize();
//         }
//     }, [localUser?.id]);

//     return {
//         ...socketHook,
//         ...handles,
//         // requestResponses: requestResponses.current,
//         requestResponses,
//         callState,
//     };
// }