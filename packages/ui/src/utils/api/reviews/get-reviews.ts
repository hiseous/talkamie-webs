import { __apiUrls } from "../../constants/api-urls";
import { userReviewProps } from "../../types/user-review";
import { useFetchApi } from "../useFetchApi";
import { useGetUserReviewsTriggerProps } from "../user/get-reviews";

export const useGetLocalUserReviewsApi = () => {
    const api = useFetchApi<userReviewProps[]>({
        fallBackToastError: `could not get your reviews`,
    });

    const handles = {
        trigger: (triggerProps: Pick<useGetUserReviewsTriggerProps, 'query'>) => {
            api.trigger({
                url: __apiUrls.reviews(),
                body: triggerProps.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}