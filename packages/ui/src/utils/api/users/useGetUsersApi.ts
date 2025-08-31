import { queryPaginationProps } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { userGender, userProps, userType } from "../../types/user";
import { useFetchApi } from "../useFetchApi";

export type getUsersTriggerProps = {
    query?: queryPaginationProps & {
        // id?: string | number;
        email?: string;
        type?: userType;
        keyword?: string;
        age?: number | string;
        minAge?: number | string;
        maxAge?: number | string;
        location?: string;
        gender?: userGender;
    };
}

export type getUsersData = userProps[];

export const useGetUsersApi = () => {
    const api = useFetchApi<getUsersData>({
        fallBackToastError: `could not get users`,
    });

    const handles = {
        trigger: (triggerProps?: getUsersTriggerProps) => {
            api.trigger({
                url: __apiUrls.users(),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}