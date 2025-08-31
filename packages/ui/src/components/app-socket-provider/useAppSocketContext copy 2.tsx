// 'use client';

// import { useEffect, useState } from "react";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { useWebSocket } from "../web-socket/useWebSocket";
// import { wsAuthRespData, wsGetMessagesProps, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRequestResponses, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData, wsUpdateMessagesRequestBody, wsUpdateMessagesRespData } from "../../utils/types/ws";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { Socket } from "socket.io-client";

// export type AppSocketContextType = ReturnType<typeof useAppSocketContext> | undefined;
// export const useAppSocketContext = () => {
//     const dashboard = useDashboard();
//     const localUser = useLocalUser();
//     const socketHook = useWebSocket();
//     // const socket = socketHook.socket;
//     // const requestResponses = useRef<wsRequestResponses>({});
//     const [requestResponses, setRequestResponses] = useState<wsRequestResponses>({});
    
//     const handles = {
//         // sendToSocket: (body: wsRequestBody) => {
//         //     socketHook.sendToSocket(body);
//         // },
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
//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['send-message']: {
//                     loading: true,
//                 },
//             }));
//         },
//         onSendMessage: (response?: wsResponse<wsSendMessageRespData>) => {
//             console.log('send-message', {response});

//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['send-message']: {
//                     loading: false,
//                 },
//             }));
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
//                 pageSize: 2,
//                 lastEvaluatedKey: chat?.messages?.pagination?.lastEvaluatedKey,
//             };
//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['get-messages']: {
//                     loading: true,
//                 },
//             }));
//             socketHook.sendToSocket(body);
//         },
//         onGetMessages: (response?: wsResponse<wsGetMessagesRespData>) => {
//             console.log('get-messages', {response});

//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['get-messages']: {
//                     loading: false,
//                 },
//             }));
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
//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['update-messages']: {
//                     loading: true,
//                 },
//             }));
//         },
//         onUpdateMessages: (response?: wsResponse<wsUpdateMessagesRespData>) => {//update messages props only;
//             console.log('update-messages', {response});

//             setRequestResponses(prev => ({
//                 ...prev,
//                 ['update-messages']: {
//                     loading: false,
//                 },
//             }));
//             if(response?.data?.chatId){
//                 dashboard?.chats.updateMessages({
//                     chatId: response.data.chatId,
//                     messagesMap: response.data.messagesMap,
//                 });
//             }
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
//     };
// }