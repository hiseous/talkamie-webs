import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";
import { usePostUserReviewRespData, usePostUserReviewTriggerProps } from "./post-review";

export const useDeleteUserReviewApi = () => {
    const api = useFetchApi<Pick<usePostUserReviewRespData, 'user'>>({
        fallBackToastError: `could not remove review`,
    });

    const handles = {
        trigger: (triggerProps: Pick<usePostUserReviewTriggerProps, 'revieweeId'>) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.revieweeId, ['review']),
                method: 'delete',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}