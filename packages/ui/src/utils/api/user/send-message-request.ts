import { __apiUrls } from "../../constants/api-urls";
import { chatMessageProps, chatProps } from "../../types/chat";
import { itemId } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
    body: {
        text?: string;
    };
}
type respData = {
    chat?: Pick<chatProps, 'id'>;
    message?: chatMessageProps;
}

export const useSendUserMessageRequestApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not send message request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.itemId, ['message', 'request']),
                method: 'post',
                body: triggerProps.body,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}