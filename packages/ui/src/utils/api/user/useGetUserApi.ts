import { itemId } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { userProps } from "../../types/user";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    userId: itemId;
}
type respData = userProps;

export const useGetUserApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not get user`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}