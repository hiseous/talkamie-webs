import { useEffect, useRef } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { getContainerScrollDistance, scrollContainerTo } from "../../utils/funcs/dom/scroll";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { getElementVisibleNodes } from "../../utils/funcs/dom/viewport";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { supportTicketProps } from "../../utils/types/support";

type refProps = {
    canAutoScrollToBottom?: boolean;
    // messagesMapToUpdate?: wsUpdateMessagesRequestBody['messagesMap'];
    lastScrollFromBottom?: number;
}
type useSupportTicketBodyProps = {
    ticket: supportTicketProps | undefined;
    updateTicket?: (supportTicketProps?: supportTicketProps) => void;
}

export const useSupportTicketBody = (props?: useSupportTicketBodyProps) => {
    // const localUser = useLocalUser();
    const getMessageDebounce = useDebounce();
    const updateMessageDebounce = useDebounce();
    const dashboard = useDashboard();
    const ticket = props?.ticket?.id ? {...dashboard?.supportTickets?.records?.[props.ticket.id]} : undefined;
    
    const ref = useRef<refProps>({
        canAutoScrollToBottom: true,
    });
    const appSocket = useAppSocket();
    const loading = appSocket?.requests?.['get-messages']?.loading;
    const initiallyLoading = appSocket?.requests?.['get-messages']?.initiallyLoading;
    
    const handles = {
        getMessages: () => {
            // console.log('ran', {id: props?.ticket?.id, len: ticket?.messages?.items?.length, loading})
            if(!loading && props?.ticket?.id && (ticket?.messages?.items === undefined || ticket?.messages?.pagination?.lastEvaluatedKey)){
                appSocket?.getSupportMessages({
                    ticketId: props.ticket.id,
                    // userId: localUser?.id,
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
                if(props?.ticket?.id && ticket?.messagesMapToUpdate && Object.keys(ticket.messagesMapToUpdate).length){
                    appSocket?.updateSupportMessages({
                        ticketId: props?.ticket?.id,
                        // userId: localUser?.id,
                        messagesMap: ticket.messagesMapToUpdate,
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
            if(container && ticket){
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
                        if(ticket.messagesMapToUpdate){
                            ticket.messagesMapToUpdate[messageId] = {
                                status: 'read',
                            };
                        }
                        else {
                            ticket.messagesMapToUpdate = {
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
        getBodyNode: () => document.querySelector(`.${__classSelectors.chatBody}`) || undefined,
    };
    
    useEffect(() => {
        handles.scrollToBottom(false);
    }, []);
    // useEffect(() => {
    //     if(!ticket?.request?.hasBeenChecked && props?.ticket?.id && props?.ticket?.request?.text){
    //         dashboard?.supportTickets.addMessages({
    //             ticketId: props.ticket.id,
    //             messages: [{
    //                 id: props.ticket.request.id,
    //                 text: props.ticket.request.text,
    //                 timestamp: props.ticket.request.timestamp,
    //                 sender: props.ticket.request.sender,
    //                 delivery: props.ticket.request.delivery,
    //             }],
    //             requestHasBeenChecked: true,
    //         });
    //     }
    // }, [props?.ticket?.request?.id]);
    useEffect(() => {
        if(!loading && props?.ticket?.id && appSocket?.status?.state === 'connected' && appSocket.status.authed){
            //initially fetch the ticket messages;
            handles.getMessages();
        }
    }, [props?.ticket?.id, appSocket?.status?.state, appSocket?.status?.authed]);
    useEffect(() => {
        if(ref.current.canAutoScrollToBottom){
            handles.scrollToBottom(false);
        }
        // else if(ref.current.canAutoScrollToBottom === false){
        else {
            handles.scrollFromBottom();
        }
        
        handles.checkMessageReceipts(handles.getBodyNode());
    }, [ticket?.messages?.items?.length]);
    // useEffect(() => {
    //     if(appSocket?.requests?.["send-message"]?.loading === false){

    //     }
    // }, [appSocket?.requests?.["send-message"]?.loading]);
    
    return {
        ...handles,
        ticket,
        loading,
        initiallyLoading,
    };
};