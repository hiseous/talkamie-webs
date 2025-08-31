import { __apiUrls } from "../../constants/api-urls";
import { userAvailabilityWeeklyItems } from "../../types/user-availability";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    body: userAvailabilityWeeklyItems;
}

export const usePostUserAvailabilityWeeklyItemsApi = () => {
    const api = useFetchApi<userAvailabilityWeeklyItems>({
        fallBackToastError: `could not post availability items`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.availability(['weekly']),
                body: triggerProps?.body,
                method: 'post',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}