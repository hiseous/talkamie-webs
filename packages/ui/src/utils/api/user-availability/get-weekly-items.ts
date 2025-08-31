import { __apiUrls } from "../../constants/api-urls";
import { queryPaginationProps } from "../../types/global.types";
import { userAvailabilityWeeklyItems } from "../../types/user-availability";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    query?: queryPaginationProps & {
        year?: number | string;
        monthIndex?: number | string;
        monthDay?: number | string;
    };
}

export const useGetUserAvailabilityWeeklyItemsApi = () => {
    const api = useFetchApi<userAvailabilityWeeklyItems>({
        fallBackToastError: `could not get availability items`,
    });

    const handles = {
        trigger: (triggerProps?: triggerProps) => {
            api.trigger({
                url: __apiUrls.availability(['weekly']),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}