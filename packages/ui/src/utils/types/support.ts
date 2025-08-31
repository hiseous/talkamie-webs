import { chatMessageProps, chatProps } from "./chat";
import { itemId } from "./global.types";

export type supportTicketProps = Pick<chatProps, 'id' | 'user'> & {
    status?: 'open' | 'closed';
}

export type supportMessageProps = Pick<chatMessageProps, 'delivery' | 'id' | 'text' | 'timestamp' | 'type'> & {
    sender?: {
        id?: itemId;
    };
}