import { chatProps } from "./chat";
import { itemId } from "./global.types";
import { userProps } from "./user";

export type callType = 'audio' | 'video';
export type callProps = {
    id?: itemId;
    type?: callType;
    duration?: number; //in seconds;
    status?: 'ringing' | 'missed' | 'accepted' | 'rejected';
    direction?: 'outgoing' | 'incoming';
    user?: userProps;
    timestamp?: string;
    chat?: Pick<chatProps, 'id'>;
}