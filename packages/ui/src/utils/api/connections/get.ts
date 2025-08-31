import { __apiUrls } from "../../constants/api-urls";
import { queryPaginationProps } from "../../types/global.types";
import { userProps } from "../../types/user";
import { useFetchApi } from "../useFetchApi";

export type useGetUsersInConnectionApiTriggerProps = {
    query?: queryPaginationProps & {
        keyword?: string;
    };
}
export type useGetUsersInConnectionApiRespData = userProps[];

export const useGetUsersInConnectionApi = () => {
    const api = useFetchApi<useGetUsersInConnectionApiRespData>({
        fallBackToastError: `could not get connections`,
    });

    const handles = {
        trigger: (triggerProps?: useGetUsersInConnectionApiTriggerProps) => {
            api.trigger({
                url: __apiUrls.connections(['users']),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}