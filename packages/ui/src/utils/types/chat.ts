import { connectRequestStatus } from "./connect";
import { itemId } from "./global.types";
import { scheduleProps } from "./schedule";
import { userProps } from "./user";

export type chatMessageDeliveryStatus = 'sent' | 'delivered' | 'read';
export type chatMessageProps = {
    id?: itemId;
    type?: 'text' | 'schedule';
    text?: string;
    schedule?: Omit<scheduleProps, 'attendee'>;
    timestamp?: string; //utc timestamp;
    sender?: userProps;
    delivery?: {
        status?: chatMessageDeliveryStatus;
        at?: string; //utc timestamp;
    };
    isRequest?: boolean;
}
export type chatProps = {
    id?: itemId;
    user?: userProps;
    timestamp?: string; //utc timestamp;
    lastMessage?: chatMessageProps;
    totalUnreadMessages?: number;
    request?: Pick<chatMessageProps, 'id' | 'text' | 'timestamp' | 'delivery'> & {
        status?: connectRequestStatus;
        sender?: Pick<userProps, 'id'>;
    };
    type?: 'connect' | 'message';
};