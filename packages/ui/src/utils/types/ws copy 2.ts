// import { responsePagination } from "../api/useFetchApi";
// import { chatMessageProps } from "./chat";
// import { itemId, queryPaginationProps } from "./global.types";
// import { userProps } from "./user";

// export type wsStatus = {
//     state?: 'connected' | 'connecting' | 'disconnected';
//     initialized?: boolean;
//     authed?: boolean;
// };

// export type wsEventAction = 'send-message' | 'get-messages' | 'new-message';
// export type wsResponse<dataType = unknown> = {
//     success?: boolean;
//     statusCode?: number;
//     message?: string;
//     data?: dataType;
//     pagination?: responsePagination;
// }

// export type wsAuthenticateRespData = userProps | undefined;

// export type wsGetMessagesProps = {
//     chatId?: itemId;
// }
// export type wsGetMessagesRequestBody = queryPaginationProps & {
//     chatId?: itemId;
//     receiverId?: itemId;
// }
// export type wsGetMessagesRespData = {
//     chatId?: itemId;
//     messages?: chatMessageProps[];
// }
// export type wsNewMessageRespData = {
//     chatId?: itemId;
//     message?: chatMessageProps;
// }

// export type wsSendMessageRequestBody = {
//     chatId?: itemId;
//     receiverId?: itemId;
//     message?: {
//         text?: string;
//     };
// }
// export type wsSendMessageRespData = {
//     chatId?: itemId;
//     message?: chatMessageProps;
// }

// export type wsRequestResponses = {
//     [eventName in wsEventAction]?: {
//         loading?: boolean;
//     };
// }