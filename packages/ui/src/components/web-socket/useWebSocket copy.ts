// 'use client';

// import { useEffect, useState } from "react";
// import { __apiUrls } from "../../utils/constants/api-urls";
// import { getLocalUserStorage } from "../local-user-provider/local-user-storage";
// import { fromTimestamp } from "../../utils/funcs/time/timestamp";
// import { wsAuthenticateRespData, wsAuthRequestBody, wsGetMessagesRequestBody, wsGetMessagesRespData, wsNewMessageRespData, wsRequestBody, wsResponse, wsSendMessageRequestBody, wsSendMessageRespData, wsStatus } from "../../utils/types/ws";
// import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { itemId } from "../../utils/types/global.types";
// import { useLocalUser } from "../local-user-provider/useLocalUser";

// export const useWebSocket = () => {
//     const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
//     const [status, setStatus] = useState<wsStatus>({});
//     // const [initialized, setInitialized] = useState<boolean | undefined>(undefined);
//     // const servers = { iceServers: [{ urls: __urls.stunServer }] };
//     const toast = useToastMessage();
//     const dashboard = useDashboard();
//     const localUser = useLocalUser();
//     // const requests = useRef
    
//     const handles = {
//         initialize: () => {
//             const newSocket = new WebSocket(__apiUrls.webSocket())
//             setSocket(newSocket);
//             setStatus(prev => ({
//                 ...prev,
//                 initialized: true,
//             }));
//             // setInitialized(true);
//         },
//         onopen: () => {
//             console.log("websocket connected", fromTimestamp(undefined, true).dateTime.iso);
//             setStatus(prev => ({
//                 ...prev,
//                 state: 'connected',
//             }));
//             handles.authenticate();
//         },
//         onclose: () => {
//             console.log("Websocket disconnected!", fromTimestamp(undefined, true).dateTime.iso);
//             setStatus(prev => ({
//                 ...prev,
//                 state: 'disconnected',
//             }));
//         },
//         onerror: (error: Event) => {
//             // toastMessage.error('some socket error');
//             console.log('WebSocket Error: ', error);
//             toast.error('something went wrong on the live socket');
//         },
//         onmessage: async (event: MessageEvent) => {
//             const response = JSON.parse(event.data) as wsResponse | undefined;
//             console.log(response)
//             // console.log({event, response})

//             if(response?.success){
//                 if(response?.action === 'authenticate'){
//                     const respData = response.data as wsAuthenticateRespData | undefined;
//                     if(response.success && respData?.id === localUser?.id){
//                         setStatus(prev => ({
//                             ...prev,
//                             authed: true,
//                         }));
//                     }
//                 }
//                 else if(response?.action === 'new-message'){
//                     const respData = response.data as wsNewMessageRespData | undefined;
//                     if(respData?.chatId){
//                         dashboard?.chats.addMessages({
//                             chatId: respData.chatId,
//                             messages: respData.message ? [respData.message] : undefined,
//                             asNewItems: true,
//                         });
//                     }
//                 }
//                 else if(response?.action === 'get-messages'){
//                     const respData = response.data as wsGetMessagesRespData | undefined;
//                     if(respData?.chatId){
//                         dashboard?.chats.addMessages({
//                             chatId: respData.chatId,
//                             messages: respData.messages,
//                             pagination: response.pagination,
//                         });
//                     }
//                 }
//                 else if(response?.action === 'send-message'){
//                     const respData = response.data as wsSendMessageRespData | undefined;
//                     if(respData?.chatId){
//                         dashboard?.chats.addMessages({
//                             chatId: respData.chatId,
//                             messages: respData.message ? [respData.message] : undefined,
//                             asNewItems: true,
//                         });
//                     }
//                 }
//             }
//             else {
//                 console.log({action: response?.action, errorMsg: response?.message})
//                 toast.error(response?.message || 'something went wrong on the live socket');
//             }
//         },
//         sendToSocket: (body: wsRequestBody) => {
//             socket?.send(JSON.stringify(body));
//         },
//         authenticate: () => {
//             const body: wsAuthRequestBody = {
//                 action: 'authenticate',
//                 token: getLocalUserStorage()?.accessToken,
//             };
//             handles.sendToSocket(body);
//         },
//         sendMessage: (body: wsSendMessageRequestBody) => {
//             handles.sendToSocket({
//                 ...body,
//                 action: 'send-message',
//             });
//         },
//         getMessages: (chatId: itemId) => {
//             const body: wsGetMessagesRequestBody = {
//                 action: 'get-messages',
//                 chatId,
//                 pageSize: 10,
//                 lastEvaluatedKey: dashboard?.chats.records?.[chatId]?.messages?.pagination?.lastEvaluatedKey,
//             };
//             handles.sendToSocket(body);
//         },
//     };
        
//     useEffect(() => {
//         if(socket && status.initialized){
//             socket.onopen = handles.onopen;
//             socket.onclose = handles.onclose;
//             socket.onerror = handles.onerror;
//             socket.onmessage = handles.onmessage;
//         }
//     }, [status.initialized]);
    
//     return {
//         ...handles,
//         socket,
//         status,
//     };
// };