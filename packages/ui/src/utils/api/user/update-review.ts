import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";
import { usePostUserReviewRespData, usePostUserReviewTriggerProps } from "./post-review";

export const useUpdateUserReviewApi = () => {
    const api = useFetchApi<usePostUserReviewRespData>({
        fallBackToastError: `could not update review`,
    });

    const handles = {
        trigger: (triggerProps: usePostUserReviewTriggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.revieweeId, ['review']),
                method: 'put',
                body: triggerProps.body,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}