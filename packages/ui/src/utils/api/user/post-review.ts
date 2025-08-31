import { __apiUrls } from "../../constants/api-urls";
import { itemId } from "../../types/global.types";
import { userProps } from "../../types/user";
import { userReviewProps } from "../../types/user-review";
import { useFetchApi } from "../useFetchApi";

export type usePostUserReviewTriggerProps = {
    revieweeId: itemId;
    body: {
        text?: string;
        rate?: number;
    };
}
export type usePostUserReviewRespData = {
    review?: userReviewProps;
    user?: Pick<userProps, 'id' | 'rating' | 'totalReviews'>;
};

export const usePostUserReviewApi = () => {
    const api = useFetchApi<usePostUserReviewRespData>({
        fallBackToastError: `could not post review`,
    });

    const handles = {
        trigger: (triggerProps: usePostUserReviewTriggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.revieweeId, ['review']),
                method: 'post',
                body: triggerProps.body,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}