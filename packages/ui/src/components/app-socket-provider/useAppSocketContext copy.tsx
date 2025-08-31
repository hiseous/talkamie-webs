// 'use client';

// import { useEffect, useRef } from "react";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { useWebSocket } from "../web-socket/useWebSocket";
// import { wsAuthenticateRespData, wsEventAction, wsGetMessagesProps, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRequestResponses, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData } from "../../utils/types/ws";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { Socket } from "socket.io-client";

// export type AppSocketContextType = ReturnType<typeof useAppSocketContext> | undefined;
// export const useAppSocketContext = () => {
//     const dashboard = useDashboard();
//     const localUser = useLocalUser();
//     const socketHook = useWebSocket();
//     const socket = socketHook.socket;
//     const requestResponses = useRef<wsRequestResponses>({});
    
//     const handles = {
//         sendToSocket: (eventAction: wsEventAction, reqBody?: any) => {
//             if(socket){
//                 socket.emit(eventAction, reqBody);
//             }
//         },
//         onAuth: (response?: wsResponse) => {
//             console.log('auth', {response});
//             const respData = response?.data as wsAuthenticateRespData | undefined;
//             if(response?.success && respData?.id === localUser?.id){
//                 socketHook.setStatus(prev => ({
//                     ...prev,
//                     authed: true,
//                     state: 'connected',
//                 }));
//             }
//         },
//         sendMessage: (body: wsSendMessageRequestBody) => {
//             handles.sendToSocket('send-message', body);
//             requestResponses.current['send-message'] = {
//                 loading: true,
//             };
//         },
//         onSendMessage: (response?: wsResponse) => {
//             console.log('send-message', {response});

//             requestResponses.current['send-message'] = {
//                 loading: false,
//             };
//             const respData = response?.data as wsSendMessageRespData | undefined;
//             if(respData?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: respData.chatId,
//                     messages: respData.message ? [respData.message] : undefined,
//                     asNewItems: true,
//                 });
//             }
//         },
//         onNewMessage: (response?: wsResponse) => {
//             console.log('new-message', {response});

//             const respData = response?.data as wsNewMessageRespData | undefined;
//             if(respData?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: respData.chatId,
//                     messages: respData.message ? [respData.message] : undefined,
//                     asNewItems: true,
//                 });
//             }
//         },
//         getMessages: (thisProps: wsGetMessagesProps) => {
//             const chat = (thisProps.chatId ? dashboard?.chats.records?.[thisProps.chatId] : undefined);
//             const body: wsGetMessagesRequestBody = {
//                 chatId: thisProps.chatId,
//                 // receiverId: thisProps.receiverId,
//                 pageSize: 2,
//                 lastEvaluatedKey: chat?.messages?.pagination?.lastEvaluatedKey,
//             };
//             handles.sendToSocket('get-messages', body);
//             requestResponses.current['get-messages'] = {
//                 loading: true,
//             };
//         },
//         onGetMessages: (response?: wsResponse) => {
//             console.log('get-messages', {response});

//             requestResponses.current['get-messages'] = {
//                 loading: false,
//             };
//             const respData = response?.data as wsGetMessagesRespData | undefined;
//             if(respData?.chatId){
//                 dashboard?.chats.addMessages({
//                     chatId: respData.chatId,
//                     messages: respData.messages,
//                     pagination: response?.pagination,
//                 });
//             }
//         },
//         onDisconnect: (reason: Socket.DisconnectReason) => {
//             console.log('disconnected', {reason});
//         },
//     };
    
//     useEffect(() => {
//         if(localUser?.id && !socketHook.status.initialized){
//             socketHook.initialize();
//         }
//     }, [localUser?.id]);
//     useEffect(() => {
//         if(socketHook.status.initialized && socket){
//             socket.on('auth', handles.onAuth);
//             socket.on('send-message', handles.onSendMessage);
//             socket.on('new-message', handles.onNewMessage);
//             socket.on('get-messages', handles.onGetMessages);
//             socket.on('disconnect', handles.onDisconnect);
//         }

//         return () => {
//             socket?.disconnect();
//         };
//     }, [socketHook.status.initialized, socket]);

//     return {
//         ...socketHook,
//         ...handles,
//         requestResponses,
//     };
// }