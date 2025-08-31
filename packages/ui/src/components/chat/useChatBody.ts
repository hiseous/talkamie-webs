import { useEffect, useRef } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { chatProps } from "../../utils/types/chat";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { getContainerScrollDistance, scrollContainerTo } from "../../utils/funcs/dom/scroll";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { getElementVisibleNodes } from "../../utils/funcs/dom/viewport";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { useAcceptUserMessageRequestApi } from "../../utils/api/user/accept-message-request";
import { useRejectUserMessageRequestApi } from "../../utils/api/user/reject-message-request";

type refProps = {
    canAutoScrollToBottom?: boolean;
    // messagesMapToUpdate?: wsUpdateMessagesRequestBody['messagesMap'];
    lastScrollFromBottom?: number;
}
type useChatBodyProps = {
    chat: chatProps | undefined;
    updateChat?: (chatProps?: chatProps) => void;
}

export const useChatBody = (props?: useChatBodyProps) => {
    const getMessageDebounce = useDebounce();
    const updateMessageDebounce = useDebounce();
    const acceptApi = useAcceptUserMessageRequestApi();
    const rejectApi = useRejectUserMessageRequestApi();
    const dashboard = useDashboard();
    const chat = props?.chat?.id ? {...dashboard?.chats?.records?.[props.chat.id]} : undefined;
    const ref = useRef<refProps>({
        canAutoScrollToBottom: true,
    });
    const appSocket = useAppSocket();
    const loading = appSocket?.requests?.['get-messages']?.loading;
    const initiallyLoading = appSocket?.requests?.['get-messages']?.initiallyLoading;
    
    const handles = {
        getMessages: () => {
            // console.log('ran', {id: props?.chat?.id, len: chat?.messages?.items?.length, loading})
            if(!loading && props?.chat?.id && (chat?.messages?.items === undefined || chat?.messages?.pagination?.lastEvaluatedKey)){
                appSocket?.getMessages({
                    chatId: props.chat.id,
                    // receiverId: props.chat.receiver?.id,
                });
            }
        },
        deboucelyGetPreviousMessages: () => {
            const debouncedQuery = getMessageDebounce.trigger(() => {
                //get more messages;
                handles.getMessages();
            }, 100);
            debouncedQuery();
        },
        deboucelyUpdateMessages: () => {
            const debouncedQuery = updateMessageDebounce.trigger(() => {
                //update messages statuses;
                if(props?.chat?.id && chat?.messagesMapToUpdate && Object.keys(chat.messagesMapToUpdate).length){
                    appSocket?.updateMessages({
                        chatId: props?.chat?.id,
                        // receiverId: props?.chat?.receiver?.id,
                        messagesMap: chat.messagesMapToUpdate,
                    });
                }
            }, 100);
            debouncedQuery();
        },
        checkCanAutoScrollToBottom: (node: Element) => {
            const fromProps = getContainerScrollDistance(node).from;
            const distanceFromBottom = fromProps?.bottom ?? 0;

            ref.current.lastScrollFromBottom = distanceFromBottom;
            const lim = 50;
            
            let canAutoScrollToBottom: boolean | undefined;
            if(distanceFromBottom <= lim){
                canAutoScrollToBottom = true;
            }
            else {
                canAutoScrollToBottom = false;
            }

            return {
                canAutoScrollToBottom,
                lim,
                distanceFrom: fromProps,
            };
        },
        onScroll: (e:  React.UIEvent<HTMLDivElement, UIEvent>) => {
            const checkProps = handles.checkCanAutoScrollToBottom(e.currentTarget);
            const distanceFromTop = checkProps.distanceFrom?.top ?? 0;

            if(distanceFromTop < checkProps.lim){
                handles.deboucelyGetPreviousMessages();
            }
            ref.current.canAutoScrollToBottom = checkProps.canAutoScrollToBottom;

            handles.checkMessageReceipts(e.currentTarget);
        },
        checkMessageReceipts: (container?: Element) => {
            if(container && chat){
                const elements = getElementVisibleNodes({
                    container,
                    querySelector: `.${__classSelectors.chatBodyMessage}.second-user-message:not([data-status="read"])`,
                }).visibleElements;
                // console.log({elements})
                // const messagesMap: wsUpdateMessagesRequestBody['messagesMap'] = {};

                elements.map((element) => {
                    const messageId = element.getAttribute('data-id') || undefined;
                    // const messageStatus = element.getAttribute('data-status') || undefined;
                    if(messageId){
                        if(chat.messagesMapToUpdate){
                            chat.messagesMapToUpdate[messageId] = {
                                status: 'read',
                            };
                        }
                        else {
                            chat.messagesMapToUpdate = {
                                [messageId]: {
                                    status: 'read',
                                },
                            };
                        }
                    }
                })
                handles.deboucelyUpdateMessages();
            }
        },
        scrollToBottom: (smooth = true) => {
            scrollContainerTo({
                classSelector: 'chatBody',
                to: 'bottom',
                delay: 0.2,
                smooth,
            });
        },
        scrollFromBottom: () => {
            const bodyNode = handles.getBodyNode();
            if(bodyNode){
                const scrollTop = bodyNode.scrollHeight - bodyNode.clientHeight - (ref.current.lastScrollFromBottom ?? 0);
                bodyNode.scrollTop = scrollTop;
            }
        },
        acceptMessageRequest: () => {
            if(props?.chat?.user?.id){
                acceptApi.trigger({
                    itemId: props.chat.user.id,
                });
            }
        },
        rejectMessageRequest: () => {
            if(props?.chat?.user?.id){
                rejectApi.trigger({
                    itemId: props.chat.user.id,
                });
            }
        },
        getBodyNode: () => document.querySelector(`.${__classSelectors.chatBody}`) || undefined,
    };
    
    useEffect(() => {
        handles.scrollToBottom(false);
    }, []);
    // useEffect(() => {
    //     if(!chat?.request?.hasBeenChecked && props?.chat?.id && props?.chat?.request?.text){
    //         dashboard?.chats.addMessages({
    //             chatId: props.chat.id,
    //             messages: [{
    //                 id: props.chat.request.id,
    //                 text: props.chat.request.text,
    //                 timestamp: props.chat.request.timestamp,
    //                 sender: props.chat.request.sender,
    //                 delivery: props.chat.request.delivery,
    //             }],
    //             requestHasBeenChecked: true,
    //         });
    //     }
    // }, [props?.chat?.request?.id]);
    useEffect(() => {
        if(!loading && props?.chat?.id && appSocket?.status?.state === 'connected' && appSocket.status.authed){
            //initially fetch the chat messages;
            handles.getMessages();
        }
    }, [props?.chat?.id, appSocket?.status?.state, appSocket?.status?.authed]);
    useEffect(() => {
        if(ref.current.canAutoScrollToBottom){
            handles.scrollToBottom(false);
        }
        // else if(ref.current.canAutoScrollToBottom === false){
        else {
            handles.scrollFromBottom();
        }
        
        handles.checkMessageReceipts(handles.getBodyNode());
    }, [chat?.messages?.items?.length]);
    // useEffect(() => {
    //     if(appSocket?.requests?.["send-message"]?.loading === false){

    //     }
    // }, [appSocket?.requests?.["send-message"]?.loading]);
    useEffect(() => {
        if(acceptApi.loading == false && acceptApi.success){
            if(props?.updateChat) props.updateChat(acceptApi.data?.chat);
        }
    }, [acceptApi.loading]);
    useEffect(() => {
        if(rejectApi.loading == false && rejectApi.success){
            if(props?.updateChat) props.updateChat(rejectApi.data?.chat);
        }
    }, [rejectApi.loading]);
    
    return {
        ...handles,
        chat,
        loading,
        initiallyLoading,
    };
};