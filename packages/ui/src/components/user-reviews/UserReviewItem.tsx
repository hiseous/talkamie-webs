'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userReviewProps } from "../../utils/types/user-review";
import RatingStars from "../node/RatingStars";

type UserReviewItemProps = ComponentPrimitiveProps & {
    item: userReviewProps | undefined;
}
const UserReviewItem = (props: UserReviewItemProps) => {
    
    return (
        <div className={`${props.className || ''} border-[1px] border-whiteVar2 rounded-xl p-4`}>
            <RatingStars
                rating={props.item?.rate}
                var="2"
            />
            <div className="mt-2">
                {props.item?.text}
            </div>
            <div className="mt-3 font-semibold">
                 – {props.item?.rater?.name}
            </div>
        </div>
    );
}

export default UserReviewItem;