// import { useEffect, useRef } from "react";
// import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
// import { chatProps } from "../../utils/types/chat";
// import { useDashboard } from "../dashboard-provider/useDashboard";
// import { getContainerScrollDistance, scrollTo } from "../../utils/funcs/dom/scroll";
// import { useAppSocket } from "../app-socket-provider/useAppSocket";
// import { domClassSelector } from "../../utils/types/selectors";
// import { wsUpdateMessagesRequestBody } from "../../utils/types/ws";
// import { getElementVisibleNodes } from "../../utils/funcs/dom/viewport";
// import { __classSelectors } from "../../utils/constants/querySelectors";

// type refProps = {
//     canAutoScrollToBottom?: boolean;
//     messagesMapToUpdate?: wsUpdateMessagesRequestBody['messagesMap'];
// }
// type useChatBodyProps = {
//     chat: chatProps | undefined;
// }

// export const useChatBody = (props?: useChatBodyProps) => {
//     const debounce = useDebounce();
//     const dashboard = useDashboard();
//     const chat = props?.chat?.id ? dashboard?.chats?.records?.[props.chat.id] : undefined;
//     const ref = useRef<refProps>({});
//     const appSocket = useAppSocket();
//     const loading = appSocket?.requestResponses?.['get-messages']?.loading;
//     const chatBodyClassName: domClassSelector = 'chatBody';

//     console.log('1', {len: chat?.messages?.items?.length, loading})
    
//     const handles = {
//         getMessages: () => {
//             console.log('ran', {id: props?.chat?.id, len: chat?.messages?.items?.length, loading})
//             if(props?.chat?.id && (chat?.messages?.items === undefined || chat?.messages?.pagination?.lastEvaluatedKey)){
//                 appSocket?.getMessages({
//                     chatId: props.chat.id,
//                 });
//             }
//         },
//         deboucelyGetPreviousMessages: () => {
//             const debouncedQuery = debounce.trigger(() => {
//                 //get more messages;
//                 handles.getMessages();
//                 // if(!loading) handles.getMessages();
//             }, 100);
//             debouncedQuery();
//         },
//         deboucelyUpdateMessages: () => {
//             const debouncedQuery = debounce.trigger(() => {
//                 //update messages statuses;
//                 if(chat?.messages?.items && ref.current.messagesMapToUpdate && Object.keys(ref.current.messagesMapToUpdate).length){
//                     appSocket?.updateMessages({
//                         chatId: props?.chat?.id,
//                         messagesMap: ref.current.messagesMapToUpdate,
//                     });
//                 }
//             }, 100);
//             debouncedQuery();
//         },
//         onScroll: (e:  React.UIEvent<HTMLDivElement, UIEvent>) => {
//             const fromProps = getContainerScrollDistance(e.currentTarget).from;
//             const distanceFromTop = fromProps?.top ?? 0;
//             const distanceFromBottom = fromProps?.bottom ?? 0;

//             const lim = 50;

//             if(distanceFromTop < lim){
//                 handles.deboucelyGetPreviousMessages();
//             }
            
//             if(distanceFromBottom <= lim){
//                 ref.current.canAutoScrollToBottom = true;
//             }
//             else {
//                 ref.current.canAutoScrollToBottom = false;
//             }

//             const elements = getElementVisibleNodes({
//                 container: e.currentTarget,
//                 querySelector: `.${__classSelectors.chatBodyMessage}.second-user-message:not([data-status="read"])`,
//             }).visibleElements;
//             // const messagesMap: wsUpdateMessagesRequestBody['messagesMap'] = {};

//             elements.map((element) => {
//                 const messageId = element.getAttribute('data-id') || undefined;
//                 // const messageStatus = element.getAttribute('data-status') || undefined;
//                 if(messageId){
//                     if(ref.current.messagesMapToUpdate){
//                         ref.current.messagesMapToUpdate[messageId] = {
//                             status: 'read',
//                         };
//                     }
//                     else {
//                         ref.current.messagesMapToUpdate = {
//                             [messageId]: {
//                                 status: 'read',
//                             },
//                         };
//                     }
//                 }
//             })
//             // handles.deboucelyUpdateMessages();

//             // console.log({distanceFromTop, distanceFromBottom}); 
//         },
//         scrollToBottom: () => {
//             scrollTo({
//                 classSelector: chatBodyClassName,
//                 to: 'bottom',
//                 delay: 0.2,
//                 smooth: true,
//             });
//         },
//     };
    
//     useEffect(() => {
//         handles.scrollToBottom();
//     }, []);
//     useEffect(() => {
//         if(props?.chat?.id && appSocket?.status.state === 'connected' && appSocket.status.authed){
//             //initially fetch the chat messages;
//             console.log('2', {len: chat?.messages?.items?.length, loading})
//             if(!chat?.messages?.items?.length && !loading){
//                 handles.getMessages();
//             }
//         }
//     }, [appSocket?.status.state, appSocket?.status.authed]);
//     useEffect(() => {
//         if(ref.current.canAutoScrollToBottom) handles.scrollToBottom();
//     }, [chat?.messages?.items?.length]);
    
//     return {
//         ...handles,
//         chat,
//         loading,
//     };
// };