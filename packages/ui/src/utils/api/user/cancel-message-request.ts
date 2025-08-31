import { __apiUrls } from "../../constants/api-urls";
import { chatProps } from "../../types/chat";
import { itemId } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
}
type respData = {
    chat?: Pick<chatProps, 'id'>;
}

export const useCancelUserMessageRequestApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not cancel message request`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.itemId, ['message', 'request']),
                method: 'delete',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}