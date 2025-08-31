import { queryPaginationProps } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { connectRequestProps } from "../../types/connect";
import { useFetchApi } from "../useFetchApi";

export type getPendingConnectRequestsTriggerProps = {
    query?: queryPaginationProps;
}

export const useGetPendingConnectRequestsApi = () => {
    const api = useFetchApi<connectRequestProps[]>({
        fallBackToastError: `could not get pending requests`,
    });

    const handles = {
        trigger: (triggerProps?: getPendingConnectRequestsTriggerProps) => {
            api.trigger({
                url: __apiUrls.connections(['pending']),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}