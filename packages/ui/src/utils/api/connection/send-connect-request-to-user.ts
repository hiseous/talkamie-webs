import { itemId } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { connectRequestProps } from "../../types/connect";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    userId: itemId;
}

export const useSendConnectRequestToUserApi = () => {
    const api = useFetchApi<connectRequestProps>({
        fallBackToastError: `could not send connect request to user`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId, ['connection']),
                method: 'post',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}