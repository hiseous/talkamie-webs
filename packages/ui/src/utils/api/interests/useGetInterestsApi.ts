import { queryPaginationProps } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { interestProps } from "../../types/interest";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    query?: queryPaginationProps & {
        keyword?: string;
    };
}

type respData = interestProps[];

export const useGetInterestsApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not get interests`,
    });

    const handles = {
        trigger: (triggerProps?: triggerProps) => {
            api.trigger({
                url: __apiUrls.interests(),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}