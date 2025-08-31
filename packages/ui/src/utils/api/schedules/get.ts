import { __apiUrls } from "../../constants/api-urls";
import { apiSchedulesSubpath } from "../../types/api";
import { queryPaginationProps } from "../../types/global.types";
import { scheduleProps } from "../../types/schedule";
import { useFetchApi } from "../useFetchApi";

export type useGetSchedulesApiRespData = scheduleProps[];
export type useGetSchedulesApiTriggerProps = {
    subpath?: apiSchedulesSubpath;
    query?: queryPaginationProps & {
        keyword?: string;
    };
}

export const useGetSchedulesApi = () => {
    const api = useFetchApi<useGetSchedulesApiRespData>({
        fallBackToastError: `could not get schedules`,
    });

    const handles = {
        trigger: (triggerProps: useGetSchedulesApiTriggerProps) => {
            api.trigger({
                url: __apiUrls.schedules(triggerProps.subpath ? [triggerProps.subpath] : undefined),
                body: triggerProps.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}