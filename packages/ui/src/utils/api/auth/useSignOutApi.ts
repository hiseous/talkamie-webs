import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";

export const useSignOutApi = () => {
    const api = useFetchApi({
        fallBackToastError: `could not sign you out`,
    });

    const handles = {
        trigger: () => {
            api.trigger({
                url: __apiUrls.auth(['sign-out']),
                method: 'delete',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}