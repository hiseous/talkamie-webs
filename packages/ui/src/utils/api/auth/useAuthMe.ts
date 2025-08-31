import { __apiUrls } from "../../constants/api-urls";
import { userProps } from "../../types/user";
import { useFetchApi } from "../useFetchApi";

type respData = {
    user?: userProps;
};

export const useAuthMeApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not authenticate you`,
        useToastError: false,
    });

    const handles = {
        trigger: () => {
            api.trigger({
                url: __apiUrls.auth(),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}