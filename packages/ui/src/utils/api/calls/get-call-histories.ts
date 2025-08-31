import { __apiUrls } from "../../constants/api-urls";
import { callProps } from "../../types/call";
import { queryPaginationProps } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type useGetCallHistoriesApiTriggerProps = {
    query?: queryPaginationProps & {
        keyword?: string;
    };
}

export const useGetCallHistoriesApi = () => {
    const api = useFetchApi<callProps[]>({
        fallBackToastError: `could not get call histories`,
    });

    const handles = {
        trigger: (triggerProps: useGetCallHistoriesApiTriggerProps) => {
            api.trigger({
                url: __apiUrls.calls(['histories']),
                body: triggerProps.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}