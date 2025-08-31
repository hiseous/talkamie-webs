import { itemId } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    userId: itemId;
}

export const useCancelConnectRequestToUserApi = () => {
    const api = useFetchApi({
        fallBackToastError: `could not cancel connection request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId, ['connection']),
                method: 'delete',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}