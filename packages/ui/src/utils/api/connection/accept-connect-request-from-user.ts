import { itemId } from "../../../utils/types/global.types";
import { __apiUrls } from "../../constants/api-urls";
import { chatProps } from "../../types/chat";
import { connectRequestProps } from "../../types/connect";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    userId: itemId;
}
type respData = connectRequestProps & {
    chat?: Pick<chatProps, 'id' | 'request'>;
}

export const useAcceptConnectRequestFromUserApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not accept connect request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.userId, ['connection', 'accept']),
                method: 'post',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}