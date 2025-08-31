import { itemId } from "./global.types";
import { userProps } from "./user";

export type connectRequestStatus = 'pending' | 'accepted' | 'rejected' | 'canceled';
export type connectRequestProps = {
    id?: itemId;
    status?: connectRequestStatus;
    from?: Pick<userProps, 'id'>;
    to?: Pick<userProps, 'id'>;
    user?: userProps;
}