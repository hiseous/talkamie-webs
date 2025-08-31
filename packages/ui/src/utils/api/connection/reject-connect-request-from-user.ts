import { itemId } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    userId: itemId;
}

export const useRejectConnectRequestFromUserApi = () => {
    const api = useFetchApi({
        fallBackToastError: `could not reject connect request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId, ['connection', 'reject']),
                method: 'delete',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}