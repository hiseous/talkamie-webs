import { __apiUrls } from "../../constants/api-urls";
import { alertProps } from "../../types/alert";
import { queryPaginationProps } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type useGetAlertsApiTriggerProps = {
    query?: queryPaginationProps & {
        
    };
}

export const useGetAlertsApi = () => {
    const api = useFetchApi<alertProps[]>({
        fallBackToastError: `could not get alerts`,
    });

    const handles = {
        trigger: (triggerProps: useGetAlertsApiTriggerProps) => {
            api.trigger({
                url: __apiUrls.alerts(),
                body: triggerProps.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}