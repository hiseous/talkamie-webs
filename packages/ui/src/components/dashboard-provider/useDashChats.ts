import { useEffect, useState } from "react";
import { chatMessageProps, chatProps } from "../../utils/types/chat";
import { itemId, itemsMap, queryPaginationProps } from "../../utils/types/global.types";
import { responsePagination } from "../../utils/api/useFetchApi";
import { wsUpdateMessagesRequestBody } from "../../utils/types/ws";
import { useGetChatsApi, useGetChatsApiTriggerProps } from "../../utils/api/chats/get";
import { apiChatsSubpath } from "../../utils/types/api";
import { getNewKey } from "../../utils/funcs/string/string";
import { findItemInObjectItems } from "../../utils/funcs/array/find";
import { useLocalUser } from "../local-user-provider/useLocalUser";

// type filterProps = {
//     keyword?: string;
//     // tab?: 'favourite' | 'unread';
// }
export type chatsMap = {
    [chatId in itemId]?: {
        chat?: Pick<chatProps, 'id'>;
        messagesMap?: itemsMap<chatMessageProps>;
    };
};

type chatExtraProps = chatProps & {
    //for front-end purposes alone;
    messages?: {
        items?: chatMessageProps[];
        pagination?: responsePagination;
    };
    messagesMapToUpdate?: wsUpdateMessagesRequestBody['messagesMap'];
    request?: {
        hasBeenChecked?: boolean;
    };
}

type records = {
    [chatId in itemId]?: chatExtraProps;
}
type addMessagesProps = {
    chatId: itemId;
    messages?: chatMessageProps[];
    pagination?: responsePagination;
    asNewItems?: boolean;
    // requestHasBeenChecked?: boolean;
}
type updateMessagesProps = {
    chatId: itemId;
    messagesMap?: itemsMap<chatMessageProps>;
}
type updateChatsMapProps = {
    chatsMap?: chatsMap;
}
type states = {
    initiallyLoading?: boolean;
    records?: records;
    items?: chatProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}

type useDashChatsProps = {
    subpath?: apiChatsSubpath;
}

export const useDashChats = (props?: useDashChatsProps) => {
    const getApi = useGetChatsApi();
    const localUser = useLocalUser();
    // const chats = usePaginatedGet<
    //     useGetChatsApiTriggerProps,
    //     useGetChatsApiRespData,
    //     elementOf<useGetChatsApiRespData>
    // >({
    //     useGetApi: useGetChatsApi,
    // });
    // const [records, setRecords] = useState<records>({});
    const [states, setStates] = useState<states>({});

    const handles = {
        addMessages: (thisProps: addMessagesProps) => {
            // console.log({thisProps})
            setStates(prev => {
                if(thisProps.chatId && thisProps.messages?.length){
                    //update last chat message;
                    const lastNewMessageIndex = thisProps.messages.length - 1;
                    if(lastNewMessageIndex >= 0 && prev.items?.length){
                        // const lastNewMessage = thisProps.messages[lastNewMessageIndex] as chatMessageProps | undefined;
                        const findProps = findItemInObjectItems({
                            items: prev.items,
                            key: ['id', thisProps.chatId],
                        });
                        if(typeof findProps.index === 'number'){
                            let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                            //how many are not yours?;
                            const totalNewMessagesReceived = thisProps.messages.filter((message) => (
                                (
                                    !localUser?.isMe(message.sender?.id) && message.delivery?.status !== 'read'
                                ) ? true : false
                            )).length;
                            totalUnreadMessages += totalNewMessagesReceived;

                            let lastMessage = prev.items[findProps.index]?.lastMessage;
                            if(!lastMessage) lastMessage = thisProps.messages[lastNewMessageIndex];

                            prev.items[findProps.index] = {
                                ...prev.items[findProps.index],
                                lastMessage,
                                totalUnreadMessages,
                            };
                        }
                    }

                    //update messages in the records;
                    prev.records = {
                        ...prev.records,
                        [thisProps.chatId]: {
                            ...prev.records?.[thisProps.chatId],
                            messages: {
                                ...prev.records?.[thisProps.chatId]?.messages,
                                //since fetched items are in desc order;
                                items: [
                                    ...(
                                        !thisProps.asNewItems ? [...(thisProps.messages || []).reverse()] : []
                                    ),
                                    ...prev.records?.[thisProps.chatId]?.messages?.items || [],
                                    ...(
                                        thisProps.asNewItems ? [...(thisProps.messages || []).reverse()] : []
                                    ),
                                ],
                                pagination: (
                                    thisProps.pagination ? thisProps.pagination :
                                    thisProps.asNewItems ? prev.records?.[thisProps.chatId]?.messages?.pagination :
                                    undefined
                                ),
                            },
                            // request: {
                            //     ...prev.records?.[thisProps.chatId]?.request,
                            //     hasBeenChecked: thisProps.requestHasBeenChecked ?? prev.records?.[thisProps.chatId]?.request?.hasBeenChecked,
                            // },
                        },
                    };
                }

                return {...prev};
            })
        },
        updateMessages: (thisProps: updateMessagesProps) => {
            setStates(prev => {
                
                if(thisProps.messagesMap && thisProps.chatId){
                    //update total unread messages;
                    const messagesArray = Object.values(thisProps.messagesMap);
                    if(messagesArray?.length && prev.items?.length){
                        const findProps = findItemInObjectItems({
                            items: prev.items,
                            key: ['id', thisProps.chatId],
                        });
                        if(typeof findProps.index === 'number'){
                            let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                            //how many are not yours?;
                            const totalNewMessagesRead = messagesArray.filter((message) => (
                                (
                                    !localUser?.isMe(message?.sender?.id) && message?.delivery?.status === 'read'
                                ) ? true : false
                            )).length;
                            totalUnreadMessages -= totalNewMessagesRead;

                            prev.items[findProps.index] = {
                                ...prev.items[findProps.index],
                                totalUnreadMessages: totalUnreadMessages > 0 ? totalUnreadMessages : 0,
                            };
                        }
                    }

                    //update records;
                    if(prev.records && thisProps.chatId in prev.records){
                        const record = { ...prev.records?.[thisProps.chatId] };
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
                                [thisProps.chatId]: {
                                    ...prev.records?.[thisProps.chatId],
                                    messagesMapToUpdate: undefined,
                                    messages: {
                                        ...prev.records?.[thisProps.chatId]?.messages,
                                        items,
                                    },
                                },
                            };
                            // return {
                            //     ...prev,
                            //     records: {
                            //         ...prev.records,
                            //         [thisProps.chatId]: {
                            //             ...prev.records?.[thisProps.chatId],
                            //             messagesMapToUpdate: undefined,
                            //             messages: {
                            //                 ...prev.records?.[thisProps.chatId]?.messages,
                            //                 items,
                            //             },
                            //         },
                            //     },
                            // };
                        }
                    }

                    //update chat request, if present;
                    if(messagesArray.length && prev.records?.[thisProps.chatId]?.request?.id){
                        for(let i = 0; i < messagesArray.length; i++){
                            if(messagesArray[i]?.id === prev.records[thisProps.chatId]?.request?.id){
                                prev.records[thisProps.chatId] = {
                                    ...prev.records[thisProps.chatId],
                                    request: {
                                        ...prev.records[thisProps.chatId]?.request,
                                        ...messagesArray[i],
                                    },
                                };
                            }
                        }
                    }
                }

                return {...prev};
            });
        },
        updateChatsMap: (thisProps: updateChatsMapProps) => {
            if(thisProps.chatsMap){
                setStates(prev => {
                    for (const chatId in thisProps.chatsMap) {
                        if (Object.prototype.hasOwnProperty.call(thisProps.chatsMap, chatId)) {
                            const mapProps = thisProps.chatsMap[chatId];
                            const messagesMap = mapProps?.messagesMap;
                            if(messagesMap && chatId){
                                //update total unread messages;
                                const messagesArray = Object.values(messagesMap);
                                if(messagesArray?.length && prev.items?.length){
                                    const findProps = findItemInObjectItems({
                                        items: prev.items,
                                        key: ['id', chatId],
                                    });
                                    if(typeof findProps.index === 'number'){
                                        let totalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;

                                        //how many are not yours?;
                                        const totalNewMessagesRead = messagesArray.filter((message) => (
                                            (
                                                !localUser?.isMe(message?.sender?.id) && message?.delivery?.status === 'read'
                                            ) ? true : false
                                        )).length;
                                        totalUnreadMessages -= totalNewMessagesRead;

                                        prev.items[findProps.index] = {
                                            ...prev.items[findProps.index],
                                            totalUnreadMessages: totalUnreadMessages > 0 ? totalUnreadMessages : 0,
                                        };
                                    }
                                }

                                //update records;
                                if(prev.records && chatId in prev.records){
                                    const record = { ...prev.records?.[chatId] };
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
                                            [chatId]: {
                                                ...prev.records?.[chatId],
                                                messagesMapToUpdate: undefined,
                                                messages: {
                                                    ...prev.records?.[chatId]?.messages,
                                                    items,
                                                },
                                            },
                                        };
                                    }
                                }

                                //update chat request, if present;
                                if(messagesArray.length && prev.records?.[chatId]?.request?.id){
                                    for(let i = 0; i < messagesArray.length; i++){
                                        if(messagesArray[i]?.id === prev.records[chatId]?.request?.id){
                                            prev.records[chatId] = {
                                                ...prev.records[chatId],
                                                request: {
                                                    ...prev.records[chatId]?.request,
                                                    ...messagesArray[i],
                                                },
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return {...prev};
                })
            }
        },
        setChatPropsOnly: (chatProps: chatProps) => {
            setStates(prev => {
                
                if(chatProps.id){
                    prev.items = [...prev.items || []];
                    prev.records = {...prev.records};

                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', chatProps.id],
                    });
                    if(typeof findProps.index === 'number'){
                        const lastTotalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;
                        const newTotalUnreadMessages = chatProps.totalUnreadMessages ?? 0;

                        prev.items[findProps.index] = {
                            // ...prev.items[findProps.index],
                            ...chatProps,
                        };

                        if(newTotalUnreadMessages > lastTotalUnreadMessages){//there's a new message in the chat;
                            if(localUser){ //using localUser?.updateUser causes a bad setState;
                                localUser.totalUnreadChats = (localUser.totalUnreadChats ?? 0) + 1
                            }
                            // localUser?.updateUser({
                            //     totalUnreadChats: (localUser.totalUnreadChats ?? 0) + 1,
                            // });
                        }
                    }
                    else {
                        //it's a new chat;
                        if(prev.wasTriggered) prev.items.unshift(chatProps);
                        if(localUser && chatProps.totalUnreadMessages){ //using localUser?.updateUser causes a bad setState;
                            localUser.totalUnreadChats = (localUser.totalUnreadChats ?? 0) + 1
                        }
                        // localUser?.updateUser({
                        //     totalUnreadChats: (localUser.totalUnreadChats ?? 0) + 1,
                        // });
                    }
                    
                    prev.records[chatProps.id] = {
                        // ...prev.records[chatProps.id],
                        ...chatProps,
                    };
                }

                return {...prev};
            });
        },
        updateChatPropsOnly: (chatId: itemId, chatProps?: chatProps) => {
            setStates(prev => {
                
                if(chatId){
                    prev.items = [...prev.items || []];
                    prev.records = {...prev.records};

                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', chatId],
                    });
                    if(typeof findProps.index === 'number'){
                        const lastTotalUnreadMessages = prev.items[findProps.index].totalUnreadMessages ?? 0;
                        const newTotalUnreadMessages = chatProps?.totalUnreadMessages ?? 0;

                        prev.items[findProps.index] = {
                            ...prev.items[findProps.index],
                            ...chatProps,
                        };

                        if(newTotalUnreadMessages > lastTotalUnreadMessages){//there's a new message in the chat;
                            if(localUser){ //using localUser?.updateUser causes a bad setState;
                                localUser.totalUnreadChats = (localUser.totalUnreadChats ?? 0) + 1
                            }
                            // localUser?.updateUser({
                            //     totalUnreadChats: (localUser.totalUnreadChats ?? 0) + 1,
                            // });
                        }
                    }
                    
                    prev.records[chatId] = {
                        ...prev.records[chatId],
                        ...chatProps,
                    };
                }

                return {...prev};
            });
        },
        getItems: (queryProps?: useGetChatsApiTriggerProps['query'], reset?: boolean) => {
            setStates(prev => {
                if(reset){
                    prev = {key: getNewKey()};
                }
                else {
                    prev.wasTriggered = true;
                }
                getApi.trigger({
                    subpath: props?.subpath,
                    query: {
                        lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
                        pageSize: 25,
                        ...queryProps,
                    }
                });

                return {...prev};
            })
        },
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

    useEffect(() => {
        if(getApi.loading !== undefined){
            setStates(prev => {
                if(getApi.success){
                    prev.pagination = getApi.pagination;
                    prev.items = [
                        ...prev.items || [],
                        ...getApi.data || [],
                    ];
                    prev.records = {...prev.records};
                    if(getApi.data?.length){
                        for(let i = 0; i < getApi.data.length; i++){
                            const chatProps = getApi.data[i];
                            if(chatProps.id){
                                prev.records[chatProps.id] = {
                                    ...prev.records[chatProps.id],
                                    ...chatProps,
                                };
                            }
                        }
                    }
                }

                return {
                    ...prev,
                    initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi.loading : prev.initiallyLoading,
                }
            });
        }
    }, [getApi.loading]);

    return {
        ...handles,
        ...states,
        loading: getApi.loading,
    };
};