import { __apiUrls } from "../../constants/api-urls";
import { queryPaginationProps } from "../../types/global.types";
import { userAvailabilityCustomItems } from "../../types/user-availability";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    query?: queryPaginationProps & {
        
    };
}

export const useGetUserAvailabilityCustomItemsApi = () => {
    const api = useFetchApi<userAvailabilityCustomItems>({
        fallBackToastError: `could not get availability items`,
    });

    const handles = {
        trigger: (triggerProps?: triggerProps) => {
            api.trigger({
                url: __apiUrls.availability(['custom']),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}