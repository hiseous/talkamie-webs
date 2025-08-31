// import { responsePagination } from "../api/useFetchApi";
// import { chatMessageProps } from "./chat";
// import { itemId, queryPaginationProps } from "./global.types";
// import { userProps } from "./user";

// export type wsStatus = {
//     state?: 'connected' | 'connecting' | 'disconnected';
//     initialized?: boolean;
//     authed?: boolean;
// };

// export type wsRequestAction = 'authenticate' | 'send-message' | 'get-messages' | 'new-message';
// export type wsRequestBody = {
//     action?: wsRequestAction;
// }
// export type wsResponse<dataType = unknown> = {
//     action?: wsRequestAction;
//     success?: boolean;
//     statusCode?: number;
//     message?: string;
//     data?: dataType;
//     pagination?: responsePagination;
// }

// export type wsAuthRequestBody = wsRequestBody & {
//     token?: string;
// }
// export type wsAuthenticateRespData = userProps | undefined;

// export type wsGetMessagesRequestBody = wsRequestBody & queryPaginationProps & {
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

// export type wsSendMessageRequestBody = wsRequestBody & {
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