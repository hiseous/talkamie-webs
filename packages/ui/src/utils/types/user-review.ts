import { itemId } from "./global.types";
import { userProps } from "./user";

export type userReviewProps = {
    id?: itemId;
    rate?: number;
    text?: string;
    rater?: Pick<userProps, 'id' | 'name'>;
}