import { __apiUrls } from "../../constants/api-urls";
import { userAvailabilityCustomItems } from "../../types/user-availability";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    body: userAvailabilityCustomItems;
}

export const usePostUserAvailabilityCustomItemsApi = () => {
    const api = useFetchApi<userAvailabilityCustomItems>({
        fallBackToastError: `could not post availability items`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.availability(['custom']),
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