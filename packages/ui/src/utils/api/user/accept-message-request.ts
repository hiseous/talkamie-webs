import { __apiUrls } from "../../constants/api-urls";
import { chatProps } from "../../types/chat";
import { itemId } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
}
type respData = {
    chat?: Pick<chatProps, 'id' | 'request'>;
}

export const useAcceptUserMessageRequestApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not accept message request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.itemId, ['message', 'request', 'accept']),
                method: 'post',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}