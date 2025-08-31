// import { useEffect, useRef, useState } from "react";
// import { wsAuthRequestBody, wsOnMessageCallbacks, wsRequestBody, wsResponse, wsStatus } from "../../utils/types/ws";
// import { __apiUrls } from "../../utils/constants/api-urls";
// import { fromTimestamp } from "../../utils/funcs/time/timestamp";
// import { getLocalUserStorage } from "../local-user-provider/local-user-storage";
// import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";

// export const useWebSocket = () => {
//     // const localUser = useLocalUser();
//     const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
//     const [status, setStatus] = useState<wsStatus>({});
//     const onMessageCallbacks = useRef<wsOnMessageCallbacks>({});
//     // const [initialized, setInitialized] = useState<boolean | undefined>(undefined);
//     // const servers = { iceServers: [{ urls: __urls.stunServer }] };
//     const toast = useToastMessage();

//     const handles = {
//         initialize: () => {
//             const newSocket = new WebSocket(__apiUrls.webSocket())
//             setSocket(newSocket);
//             setStatus(prev => ({
//                 ...prev,
//                 initialized: true,
//             }));
//         },
//         sendToSocket: (body: wsRequestBody) => {
//             // console.log('useWebSocket', {body})
//             socket?.send(JSON.stringify(body));
//         },
//         authenticate: () => {
//             const body: wsAuthRequestBody = {
//                 action: 'authenticate',
//                 token: getLocalUserStorage()?.accessToken,
//             };
//             handles.sendToSocket(body);
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
//             const response = JSON.parse(event.data) as wsResponse<any> | undefined;
//             console.log(response)
//             // console.log({event, response})

//             if(response?.action === 'authenticate'){
//                 if(onMessageCallbacks.current.onAuth) onMessageCallbacks.current.onAuth(response);
//             }
//             else if(response?.action === 'new-message'){
//                 if(onMessageCallbacks.current.onNewMessage) onMessageCallbacks.current.onNewMessage(response);
//             }
//             else if(response?.action === 'get-messages'){
//                 if(onMessageCallbacks.current.onGetMessages) onMessageCallbacks.current.onGetMessages(response);
//             }
//             else if(response?.action === 'send-message'){
//                 if(onMessageCallbacks.current.onSendMessage) onMessageCallbacks.current.onSendMessage(response);
//             }
//             else if(response?.action === 'update-messages'){
//                 if(onMessageCallbacks.current.onUpdateMessages) onMessageCallbacks.current.onUpdateMessages(response);
//             }

            
//             if(!response?.success){
//                 console.log({action: response?.action, errorMsg: response?.message})
//                 toast.error(response?.message || 'something went wrong on the live socket');
//             }
//         },
//     };

//     useEffect(() => {
//         // console.log({ini: status.initialized, isSocket: socket ? true: false})
//         if(status?.initialized && socket){
//             socket.onopen = handles.onopen;
//             socket.onclose = handles.onclose;
//             socket.onerror = handles.onerror;
//             socket.onmessage = handles.onmessage;
//         }
        
//         return () => {
//             socket?.close();
//         };
//     }, [status.initialized]);
//     useEffect(() => {
//         console.log({status})
//         if(status.initialized && status.state === 'disconnected'){
//             //reconnect;
//             console.log('reconnecting', fromTimestamp(undefined, true).dateTime.iso);
//             handles.initialize();
//         }
//     }, [status.state]);
    
//     return {
//         ...handles,
//         socket,
//         status,
//         setStatus,
//         onMessageCallbacks,
//     };
// }