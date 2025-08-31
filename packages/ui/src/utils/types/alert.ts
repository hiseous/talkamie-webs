import { chatMessageProps, chatProps } from "./chat";
import { connectRequestProps } from "./connect";
import { scheduleProps } from "./schedule";
import { userReviewProps } from "./user-review";

export type alertProps = {
    id?: string;
    type?: 'schedule' | 'connect-request' | 'message-request' | 'review';
    timestamp?: string;
    schedule?: scheduleProps;
    chat?: chatProps;
    message?: chatMessageProps;
    connectRequest?: connectRequestProps;
    review?: userReviewProps;
    status?:'read';
}