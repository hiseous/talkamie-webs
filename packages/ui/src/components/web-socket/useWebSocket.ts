'use client';

import { useEffect, useRef } from "react";
import { wsAuthRequestBody, wsOnMessageCallbacks, wsRefs, wsRequestBody, wsResponse, wsStatus } from "../../utils/types/ws";
import { __apiUrls } from "../../utils/constants/api-urls";
import { getLocalUserStorage } from "../local-user-provider/local-user-storage";
import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";

export const useWebSocket = () => {
    // const localUser = useLocalUser();
    // const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
    // const [status, setStatus] = useState<wsStatus>({});
    // const onMessageCallbacks = useRef<wsOnMessageCallbacks>({});
    // const [initialized, setInitialized] = useState<boolean | undefined>(undefined);
    // const servers = { iceServers: [{ urls: __urls.stunServer }] };
    const toast = useToastMessage();
    const refs = useRef<wsRefs>({});
    const reRender = useRerenderComponent();
    const localUser = useLocalUser();
    const localUserRef = useRef(localUser);
    
    const handles = {
        initialize: () => {
            console.log('---initializing', 'old socket', refs.current.socket?.readyState, WebSocket.OPEN)

            //close old socket;
            if(refs.current.socket?.readyState === WebSocket.OPEN){
                refs.current.socket.close();
                //onClose will trigger; and will reconnect;
            }
            else {
                const newSocket = new WebSocket(__apiUrls.webSocket());
                refs.current.socket = newSocket;
                refs.current.status = {
                    ...refs.current.status,
                    initialized: true,
                };
                // console.log('---initializing', 'new socket', refs.current.socket?.readyState, WebSocket.OPEN)
                reRender.trigger();
                // setSocket(newSocket);
                // setStatus(prev => ({
                //     ...prev,
                //     initialized: true,
                // }));
            }
        },
        sendToSocket: (body: wsRequestBody) => {
            console.log('useWebSocket-sendToSocket', {body, socket: refs.current.socket, readyState: refs.current.socket?.readyState})
            if(refs.current.status?.state === 'connected'){
                refs.current.socket?.send(JSON.stringify(body));
            }
            else {
                console.log(`can't send to socket`);
            }
        },
        updateStatus: (status?: Partial<wsStatus>) => {
            refs.current.status = {
                ...refs.current.status,
                ...status,
            };
            reRender.trigger();
        },
        setCallbacks: (messageCallbacks: wsOnMessageCallbacks) => {
            refs.current.onMessageCallbacks = messageCallbacks;
        },
        ping: () => {
            const body: wsRequestBody = {
                action: 'ping',
            };
            handles.sendToSocket(body);
        },
        authenticate: () => {
            const body: wsAuthRequestBody = {
                action: 'authenticate',
                token: getLocalUserStorage()?.accessToken,
            };
            handles.sendToSocket(body);
        },
        // onopen: () => {
        //     console.log("websocket connected", fromTimestamp(undefined, true).dateTime.iso, refs.current.socket?.readyState, WebSocket.OPEN);
        //     // setStatus(prev => ({
        //     //     ...prev,
        //     //     state: 'connected',
        //     // }));
        //     refs.current.status = {
        //         ...refs.current.status,
        //         state: 'connected',
        //     };
        //     reRender.trigger();
        // },
        // onclose: () => {
        //     console.log("Websocket disconnected!", fromTimestamp(undefined, true).dateTime.iso, refs.current.socket?.readyState, WebSocket.OPEN);
        //     // setStatus(prev => ({
        //     //     ...prev,
        //     //     state: 'disconnected',
        //     // }));
        //     refs.current.status = {
        //         ...refs.current.status,
        //         state: 'disconnected',
        //     };
        //     if(localUserRef.current?.id){
        //         handles.initialize();
        //     }
        //     reRender.trigger();
        // },
        onerror: (error: Event) => {
            // toastMessage.error('some socket error');
            console.log('WebSocket Error: ', error);
            toast.error('something went wrong on the live socket');
        },
        onmessage: async (event: MessageEvent) => {
            const response = JSON.parse(event.data) as wsResponse<any> | undefined;
            // console.log(response)
            console.log({event, response})

            if(response?.action === 'ping'){
                console.log('pinged', {response})
                setTimeout(() => {
                    handles.ping();
                }, 1000 * 60 * 8);
            }
            else if(response?.action === 'authenticate'){
                if(refs.current.onMessageCallbacks?.onAuth) refs.current.onMessageCallbacks?.onAuth(response);
            }

            else if(response?.action === 'new-message'){
                if(refs.current.onMessageCallbacks?.onNewMessage) refs.current.onMessageCallbacks?.onNewMessage(response);
            }
            else if(response?.action === 'get-messages'){
                if(refs.current.onMessageCallbacks?.onGetMessages) refs.current.onMessageCallbacks?.onGetMessages(response);
            }
            else if(response?.action === 'send-message'){
                if(refs.current.onMessageCallbacks?.onSendMessage) refs.current.onMessageCallbacks?.onSendMessage(response);
            }
            else if(response?.action === 'update-messages'){
                if(refs.current.onMessageCallbacks?.onUpdateMessages) refs.current.onMessageCallbacks?.onUpdateMessages(response);
            }
            
            else if(response?.action === 'new-support-message'){
                if(refs.current.onMessageCallbacks?.onNewSupportMessage) refs.current.onMessageCallbacks?.onNewSupportMessage(response);
            }
            else if(response?.action === 'get-support-messages'){
                if(refs.current.onMessageCallbacks?.onGetSupportMessages) refs.current.onMessageCallbacks?.onGetSupportMessages(response);
            }
            else if(response?.action === 'send-support-message'){
                if(refs.current.onMessageCallbacks?.onSendSupportMessage) refs.current.onMessageCallbacks?.onSendSupportMessage(response);
            }
            else if(response?.action === 'update-support-messages'){
                if(refs.current.onMessageCallbacks?.onUpdateSupportMessages) refs.current.onMessageCallbacks?.onUpdateSupportMessages(response);
            }

            else if(response?.action === 'update-chats'){
                if(refs.current.onMessageCallbacks?.onUpdateChats) refs.current.onMessageCallbacks?.onUpdateChats(response);
            }
            else if(response?.action === 'call-user'){
                if(refs.current.onMessageCallbacks?.onCallUser) refs.current.onMessageCallbacks?.onCallUser(response);
            }
            else if(response?.action === 'user-calling'){
                if(refs.current.onMessageCallbacks?.onUserCalling) refs.current.onMessageCallbacks?.onUserCalling(response);
            }
            else if(response?.action === 'accept-call'){
                if(refs.current.onMessageCallbacks?.onAcceptCall) refs.current.onMessageCallbacks?.onAcceptCall(response);
            }
            else if(response?.action === 'call-accepted'){
                if(refs.current.onMessageCallbacks?.onCallAccepted) refs.current.onMessageCallbacks?.onCallAccepted(response);
            }
            else if(response?.action === 'reject-call'){
                if(refs.current.onMessageCallbacks?.onRejectCall) refs.current.onMessageCallbacks?.onRejectCall(response);
            }
            else if(response?.action === 'call-rejected'){
                if(refs.current.onMessageCallbacks?.onCallRejected) refs.current.onMessageCallbacks?.onCallRejected(response);
            }
            else if(response?.action === 'end-call'){
                if(refs.current.onMessageCallbacks?.onEndCall) refs.current.onMessageCallbacks?.onEndCall(response);
            }
            else if(response?.action === 'call-ended'){
                if(refs.current.onMessageCallbacks?.onCallEnded) refs.current.onMessageCallbacks?.onCallEnded(response);
            }
            else if(response?.action === 'signal'){
                if(refs.current.onMessageCallbacks?.onSignal) refs.current.onMessageCallbacks?.onSignal(response);
            }
            // else if(response?.action === 'new-message-request'){
            //     if(refs.current.onMessageCallbacks?.onNewMessageRequest) refs.current.onMessageCallbacks?.onNewMessageRequest(response);
            // }
            // else if(response?.action === 'message-request-accepted'){
            //     if(refs.current.onMessageCallbacks?.onMessageRequestAccepted) refs.current.onMessageCallbacks?.onMessageRequestAccepted(response);
            // }
            // else if(response?.action === 'message-request-rejected'){
            //     if(refs.current.onMessageCallbacks?.onMessageRequestRejected) refs.current.onMessageCallbacks?.onMessageRequestRejected(response);
            // }
            else if(response?.action === 'alert'){
                if(refs.current.onMessageCallbacks?.onAlert) refs.current.onMessageCallbacks?.onAlert(response);
            }
            else if(response?.action === 'update-alerts'){
                if(refs.current.onMessageCallbacks?.onUpdateAlerts) refs.current.onMessageCallbacks?.onUpdateAlerts(response);
            }
            else if(response?.action === 'update-user'){
                if(refs.current.onMessageCallbacks?.onUpdateUser) refs.current.onMessageCallbacks?.onUpdateUser(response);
            }

            
            if(!response?.success && response?.action){
                console.log({action: response?.action, errorMsg: response?.message})
                toast.error(response?.message || 'something went wrong on the live socket');
            }
        },
        getStatusStateFromReadyState: (readyState: number | undefined) => {
            let state: wsStatus['state'] | undefined;
            
            if(readyState === WebSocket.CONNECTING) state = 'connecting';
            else if(readyState === WebSocket.OPEN) state = 'connected';
            else if(readyState === WebSocket.CLOSING) state = 'disconnecting';
            else if(readyState === WebSocket.CLOSED) state = 'disconnected';
            else state = undefined;
            
            return state;
        },
    };

    useEffect(() => {
        // console.log({ini: status.initialized, isSocket: socket ? true: false})
        if(refs.current.status?.initialized && refs.current.socket){
            // refs.current.socket.onopen = handles.onopen;
            // refs.current.socket.onclose = handles.onclose;
            refs.current.socket.onerror = handles.onerror;
            refs.current.socket.onmessage = handles.onmessage;
        
            // return () => {
            //     refs.current.socket?.close();
            // };
        }
    }, [refs.current.status?.initialized]);
    useEffect(() => {
        if(typeof refs.current.socket?.readyState === 'number'){
            const state = handles.getStatusStateFromReadyState(refs.current.socket?.readyState);
            console.log('socket ready state changed', refs.current.socket?.readyState, state);
            refs.current.status = {
                ...refs.current.status,
                state,
            };
            
            if(state === 'disconnected'){
                //reconnect;
                console.log('reconnecting', fromTimestamp(undefined, true).dateTime.iso);
                refs.current.status.state = 'connecting';
                handles.initialize();
            }
            else if(state === 'connected'){
                handles.authenticate();
                reRender.trigger();
            }
        }
    }, [refs.current.socket?.readyState]);
    // useEffect(() => {
    //     console.log({status: refs.current.status})
    //     if(refs.current.status?.initialized && refs.current.status.state === 'disconnected'){
    //         //reconnect;
    //         console.log('reconnecting', fromTimestamp(undefined, true).dateTime.iso);
    //         refs.current.status.state = 'connecting';
    //         handles.initialize();
    //     }
    //     else if(refs.current.status?.state === 'connected'){
    //         handles.authenticate();
    //     }
    // }, [refs.current.status?.state]);
    
    return {
        ...handles,
        ...refs.current,
        // socket,
        // status,
        // setStatus,
        // onMessageCallbacks,
    };
}