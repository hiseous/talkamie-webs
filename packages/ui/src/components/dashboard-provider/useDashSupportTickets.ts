import { useState } from "react";
import { itemId, itemsMap, queryPaginationProps } from "../../utils/types/global.types";
import { responsePagination } from "../../utils/api/useFetchApi";
import { wsUpdateMessagesRequestBody } from "../../utils/types/ws";
import { getNewKey } from "../../utils/funcs/string/string";
import { findItemInObjectItems } from "../../utils/funcs/array/find";
import { supportMessageProps, supportTicketProps } from "../../utils/types/support";

// type filterProps = {
//     keyword?: string;
//     // tab?: 'favourite' | 'unread';
// }
export type supportTicketsMap = {
    [ticketId in itemId]?: {
        ticket?: Pick<supportTicketProps, 'id'>;
        messagesMap?: itemsMap<supportMessageProps>;
    };
};

type supportTicketExtraProps = supportTicketProps & {
    //for front-end purposes alone;
    messages?: {
        items?: supportMessageProps[];
        pagination?: responsePagination;
    };
    messagesMapToUpdate?: wsUpdateMessagesRequestBody['messagesMap'];
    // request?: {
    //     hasBeenChecked?: boolean;
    // };
}

type records = {
    [ticketId in itemId]?: supportTicketExtraProps;
}
type addMessagesProps = {
    ticket: supportTicketProps | undefined;
    messages?: supportMessageProps[];
    pagination?: responsePagination;
    asNewItems?: boolean;
    // requestHasBeenChecked?: boolean;
}
type updateMessagesProps = {
    ticketId: itemId;
    messagesMap?: itemsMap<supportMessageProps>;
}
type updateSupportTicketsMapProps = {
    supportTicketsMap?: supportTicketsMap;
}
type states = {
    initiallyLoading?: boolean;
    records?: records;
    items?: supportTicketProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
    currentTicketId?: itemId;
}

export const useDashSupportTickets = () => {
    // const getApi = useGetSupportTicketsApi();
    // const localUser = useLocalUser();
    const [states, setStates] = useState<states>({});

    const handles = {
        addMessages: (thisProps: addMessagesProps) => {
            // console.log({thisProps})
            setStates(prev => {
                if(thisProps.ticket?.id && thisProps.messages?.length){
                    if(!prev.currentTicketId) prev.currentTicketId = thisProps.ticket.id;
                    // //update last chat message;
                    // const lastNewMessageIndex = thisProps.messages.length - 1;
                    // if(lastNewMessageIndex >= 0 && prev.items?.length){
                    //     const lastNewMessage = thisProps.messages[lastNewMessageIndex] as supportMessageProps | undefined;
                    //     const findProps = findItemInObjectItems({
                    //         items: prev.items,
                    //         key: ['id', thisProps.ticketId],
                    //     });
                    //     if(typeof findProps.index === 'number'){
                    //         let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                    //         // how many are not yours?;
                    //         const totalNewMessagesReceived = thisProps.messages.filter((message) => (
                    //             (
                    //                 !localUser?.isMe(message.sender?.id) && message.delivery?.status !== 'read'
                    //             ) ? true : false
                    //         )).length;
                    //         totalUnreadMessages += totalNewMessagesReceived;

                    //         let lastMessage = prev.items[findProps.index]?.lastMessage;
                    //         if(!lastMessage) lastMessage = thisProps.messages[lastNewMessageIndex];

                    //         prev.items[findProps.index] = {
                    //             ...prev.items[findProps.index],
                    //             // lastMessage,
                    //             // totalUnreadMessages,
                    //         };
                    //     }
                    // }

                    //update messages in the records;
                    prev.records = {
                        ...prev.records,
                        [thisProps.ticket.id]: {
                            ...prev.records?.[thisProps.ticket.id],
                            ...(
                                //if it's a new record;
                                !prev.records?.[thisProps.ticket.id]?.id ? {
                                    ...thisProps.ticket,
                                } : {}
                            ),
                            messages: {
                                ...prev.records?.[thisProps.ticket.id]?.messages,
                                //since fetched items are in desc order;
                                items: [
                                    ...(
                                        !thisProps.asNewItems ? [...(thisProps.messages || []).reverse()] : []
                                    ),
                                    ...prev.records?.[thisProps.ticket.id]?.messages?.items || [],
                                    ...(
                                        thisProps.asNewItems ? [...(thisProps.messages || []).reverse()] : []
                                    ),
                                ],
                                pagination: (
                                    thisProps.pagination ? thisProps.pagination :
                                    thisProps.asNewItems ? prev.records?.[thisProps.ticket.id]?.messages?.pagination :
                                    undefined
                                ),
                            },
                            // request: {
                            //     ...prev.records?.[thisProps.ticket.id]?.request,
                            //     hasBeenChecked: thisProps.requestHasBeenChecked ?? prev.records?.[thisProps.ticket.id]?.request?.hasBeenChecked,
                            // },
                        },
                    };
                }

                return {...prev};
            })
        },
        updateMessages: (thisProps: updateMessagesProps) => {
            setStates(prev => {
                
                if(thisProps.messagesMap && thisProps.ticketId){
                    //update total unread messages;
                    // const messagesArray = Object.values(thisProps.messagesMap);
                    // if(messagesArray?.length && prev.items?.length){
                    //     const findProps = findItemInObjectItems({
                    //         items: prev.items,
                    //         key: ['id', thisProps.ticketId],
                    //     });
                    //     if(typeof findProps.index === 'number'){
                    //         let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                    //         //how many are not yours?;
                    //         const totalNewMessagesRead = messagesArray.filter((message) => (
                    //             (
                    //                 !localUser?.isMe(message?.sender?.id) && message?.delivery?.status === 'read'
                    //             ) ? true : false
                    //         )).length;
                    //         totalUnreadMessages -= totalNewMessagesRead;

                    //         prev.items[findProps.index] = {
                    //             ...prev.items[findProps.index],
                    //             totalUnreadMessages: totalUnreadMessages > 0 ? totalUnreadMessages : 0,
                    //         };
                    //     }
                    // }

                    //update records;
                    if(prev.records && thisProps.ticketId in prev.records){
                        const record = { ...prev.records?.[thisProps.ticketId] };
                        const items = record.messages?.items ? [...record.messages.items] : [];
                        
                        if(items.length){
                            for(let i = 0; i < items.length; i++){
                                const item = items[i];
                                if (item?.id && item.id in thisProps.messagesMap) {
                                    const message = thisProps.messagesMap[item.id];
                                    if (message) items[i] = message;
                                }
                            }
            
                            prev.records = {
                                ...prev.records,
                                [thisProps.ticketId]: {
                                    ...prev.records?.[thisProps.ticketId],
                                    messagesMapToUpdate: undefined,
                                    messages: {
                                        ...prev.records?.[thisProps.ticketId]?.messages,
                                        items,
                                    },
                                },
                            };
                            // return {
                            //     ...prev,
                            //     records: {
                            //         ...prev.records,
                            //         [thisProps.ticketId]: {
                            //             ...prev.records?.[thisProps.ticketId],
                            //             messagesMapToUpdate: undefined,
                            //             messages: {
                            //                 ...prev.records?.[thisProps.ticketId]?.messages,
                            //                 items,
                            //             },
                            //         },
                            //     },
                            // };
                        }
                    }

                    // //update chat request, if present;
                    // if(messagesArray.length && prev.records?.[thisProps.ticketId]?.request?.id){
                    //     for(let i = 0; i < messagesArray.length; i++){
                    //         if(messagesArray[i]?.id === prev.records[thisProps.ticketId]?.request?.id){
                    //             prev.records[thisProps.ticketId] = {
                    //                 ...prev.records[thisProps.ticketId],
                    //                 request: {
                    //                     ...prev.records[thisProps.ticketId]?.request,
                    //                     ...messagesArray[i],
                    //                 },
                    //             };
                    //         }
                    //     }
                    // }
                }

                return {...prev};
            });
        },
        updateSupportTicketsMap: (thisProps: updateSupportTicketsMapProps) => {
            if(thisProps.supportTicketsMap){
                setStates(prev => {
                    for (const ticketId in thisProps.supportTicketsMap) {
                        if (Object.prototype.hasOwnProperty.call(thisProps.supportTicketsMap, ticketId)) {
                            const mapProps = thisProps.supportTicketsMap[ticketId];
                            const messagesMap = mapProps?.messagesMap;
                            if(messagesMap && ticketId){
                                //update total unread messages;
                                // const messagesArray = Object.values(messagesMap);
                                // if(messagesArray?.length && prev.items?.length){
                                //     const findProps = findItemInObjectItems({
                                //         items: prev.items,
                                //         key: ['id', ticketId],
                                //     });
                                //     if(typeof findProps.index === 'number'){
                                //         // let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                                //         //how many are not yours?;
                                //         // const totalNewMessagesRead = messagesArray.filter((message) => (
                                //         //     (
                                //         //         !localUser?.isMe(message?.sender?.id) && message?.delivery?.status === 'read'
                                //         //     ) ? true : false
                                //         // )).length;
                                //         // totalUnreadMessages -= totalNewMessagesRead;

                                //         prev.items[findProps.index] = {
                                //             ...prev.items[findProps.index],
                                //             // totalUnreadMessages: totalUnreadMessages > 0 ? totalUnreadMessages : 0,
                                //         };
                                //     }
                                // }

                                //update records;
                                if(prev.records && ticketId in prev.records){
                                    const record = { ...prev.records?.[ticketId] };
                                    const items = record.messages?.items ? [...record.messages.items] : [];
                                    
                                    if(items.length){
                                        for(let i = 0; i < items.length; i++){
                                            const item = items[i];
                                            if (item?.id && item.id in messagesMap) {
                                                const message = messagesMap[item.id];
                                                if (message) items[i] = message;
                                            }
                                        }
                        
                                        prev.records = {
                                            ...prev.records,
                                            [ticketId]: {
                                                ...prev.records?.[ticketId],
                                                messagesMapToUpdate: undefined,
                                                messages: {
                                                    ...prev.records?.[ticketId]?.messages,
                                                    items,
                                                },
                                            },
                                        };
                                    }
                                }

                                // //update chat request, if present;
                                // if(messagesArray.length && prev.records?.[ticketId]?.request?.id){
                                //     for(let i = 0; i < messagesArray.length; i++){
                                //         if(messagesArray[i]?.id === prev.records[ticketId]?.request?.id){
                                //             prev.records[ticketId] = {
                                //                 ...prev.records[ticketId],
                                //                 request: {
                                //                     ...prev.records[ticketId]?.request,
                                //                     ...messagesArray[i],
                                //                 },
                                //             };
                                //         }
                                //     }
                                // }
                            }
                        }
                    }

                    return {...prev};
                })
            }
        },
        setSupportTicketPropsOnly: (supportTicket: supportTicketProps | undefined) => {
            setStates(prev => {
                prev.currentTicketId = supportTicket?.id;

                if(supportTicket?.id){
                    prev.items = [...prev.items || []];
                    prev.records = {...prev.records};

                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', supportTicket.id],
                    });
                    if(typeof findProps.index === 'number'){
                        // const lastTotalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;
                        // const newTotalUnreadMessages = supportTicket.totalUnreadMessages ?? 0;

                        prev.items[findProps.index] = {
                            // ...prev.items[findProps.index],
                            ...supportTicket,
                        };

                        // if(newTotalUnreadMessages > lastTotalUnreadMessages){//there's a new message in the chat;
                        //     if(localUser){ //using localUser?.updateUser causes a bad setState;
                        //         localUser.totalUnreadSupportTickets = (localUser.totalUnreadSupportTickets ?? 0) + 1
                        //     }
                        //     // localUser?.updateUser({
                        //     //     totalUnreadSupportTickets: (localUser.totalUnreadSupportTickets ?? 0) + 1,
                        //     // });
                        // }
                    }
                    else {
                        //it's a new chat;
                        if(prev.wasTriggered) prev.items.unshift(supportTicket);
                        // if(localUser && supportTicket.totalUnreadMessages){ //using localUser?.updateUser causes a bad setState;
                        //     localUser.totalUnreadSupportTickets = (localUser.totalUnreadSupportTickets ?? 0) + 1
                        // }
                        // localUser?.updateUser({
                        //     totalUnreadSupportTickets: (localUser.totalUnreadSupportTickets ?? 0) + 1,
                        // });
                    }
                    
                    prev.records[supportTicket.id] = {
                        // ...prev.records[supportTicket.id],
                        ...supportTicket,
                    };
                }

                return {...prev};
            });
        },
        updateSupportTicketPropsOnly: (ticketId: itemId, supportTicket?: supportTicketProps) => {
            setStates(prev => {
                
                if(ticketId){
                    prev.items = [...prev.items || []];
                    prev.records = {...prev.records};

                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', ticketId],
                    });
                    if(typeof findProps.index === 'number'){
                        // const lastTotalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;
                        // const newTotalUnreadMessages = supportTicket?.totalUnreadMessages ?? 0;

                        prev.items[findProps.index] = {
                            ...prev.items[findProps.index],
                            ...supportTicket,
                        };

                        // if(newTotalUnreadMessages > lastTotalUnreadMessages){//there's a new message in the chat;
                        //     if(localUser){ //using localUser?.updateUser causes a bad setState;
                        //         localUser.totalUnreadSupportTickets = (localUser.totalUnreadSupportTickets ?? 0) + 1
                        //     }
                        //     // localUser?.updateUser({
                        //     //     totalUnreadSupportTickets: (localUser.totalUnreadSupportTickets ?? 0) + 1,
                        //     // });
                        // }
                    }
                    
                    prev.records[ticketId] = {
                        ...prev.records[ticketId],
                        ...supportTicket,
                    };
                }

                return {...prev};
            });
        },
        // getItems: (queryProps?: useGetSupportTicketsApiTriggerProps['query'], reset?: boolean) => {
        //     setStates(prev => {
        //         if(reset){
        //             prev = {key: getNewKey()};
        //         }
        //         else {
        //             prev.wasTriggered = true;
        //         }
        //         getApi.trigger({
        //             // subpath: props?.subpath,
        //             query: {
        //                 lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
        //                 pageSize: 25,
        //                 ...queryProps,
        //             }
        //         });

        //         return {...prev};
        //     })
        // },
        reset: () => {
            setStates({key: getNewKey()});
        },
        // onTabChange: (tab?: filterProps['tab']) => {
        //     setFilter(prev => ({
        //         ...prev,
        //         tab,
        //     }));
        // },
    };

    // useEffect(() => {
    //     if(getApi.loading !== undefined){
    //         setStates(prev => {
    //             if(getApi.success){
    //                 prev.pagination = getApi.pagination;
    //                 prev.items = [
    //                     ...prev.items || [],
    //                     ...getApi.data || [],
    //                 ];
    //                 prev.records = {...prev.records};
    //                 if(getApi.data?.length){
    //                     for(let i = 0; i < getApi.data.length; i++){
    //                         const supportTicket = getApi.data[i];
    //                         if(supportTicket.id){
    //                             prev.records[supportTicket.id] = {
    //                                 ...prev.records[supportTicket.id],
    //                                 ...supportTicket,
    //                             };
    //                         }
    //                     }
    //                 }
    //             }

    //             return {
    //                 ...prev,
    //                 initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi.loading : prev.initiallyLoading,
    //             }
    //         });
    //     }
    // }, [getApi.loading]);

    return {
        ...handles,
        ...states,
        // loading: getApi.loading,
    };
};