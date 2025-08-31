'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userReviewProps } from "../../utils/types/user-review";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import UserReviewItem from "./UserReviewItem";

type UserReviewItemsProps = ComponentPrimitiveProps & {
    items: userReviewProps[];
    loadingMore?: boolean;
}
const UserReviewItems = (props: UserReviewItemsProps) => {
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="grid grid-cols-1 gap-4">
                {
                    props.items.map((item, i) => {
                        return (
                            <UserReviewItem
                                key={`${i}_${item.id}`}
                                item={item}
                            />
                        )
                    })
                }
            </div>
            {
                props.loadingMore ?
                <SkeletonLoaderUserItems count={2} className="mt-4" /> :
                <></>
            }
        </div>
    );
}

export default UserReviewItems;