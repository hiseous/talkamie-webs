import { itemId, queryPaginationProps } from "../../types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { userReviewProps } from "../../types/user-review";
import { useFetchApi } from "../useFetchApi";

export type useGetUserReviewsTriggerProps = {
    userId: itemId;
    query?: queryPaginationProps & {

    }
}

export const useGetUserReviewsApi = () => {
    const api = useFetchApi<userReviewProps[]>({
        fallBackToastError: `could not get user reviews`,
    });

    const handles = {
        trigger: (triggerProps: useGetUserReviewsTriggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId, ['reviews']),
                body: triggerProps.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}