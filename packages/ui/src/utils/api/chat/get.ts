import { __apiUrls } from "../../constants/api-urls";
import { chatProps } from "../../types/chat";
import { itemId } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
}

export const useGetChatApi = () => {
    const api = useFetchApi<chatProps>({
        fallBackToastError: `could not get chat`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.chat(triggerProps.itemId),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}