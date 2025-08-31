import { __apiUrls } from "../../constants/api-urls";
import { apiChatsSubpath } from "../../types/api";
import { chatProps } from "../../types/chat";
import { queryPaginationProps } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

export type useGetChatsApiTriggerProps = {
    subpath?: apiChatsSubpath;
    query?: queryPaginationProps & {
        keyword?: string;
    };
}
export type useGetChatsApiRespData = chatProps[];

export const useGetChatsApi = () => {
    const api = useFetchApi<useGetChatsApiRespData>({
        fallBackToastError: `could not get chats`,
    });

    const handles = {
        trigger: (triggerProps?: useGetChatsApiTriggerProps) => {
            api.trigger({
                url: __apiUrls.chats(triggerProps?.subpath ? [triggerProps.subpath] : undefined),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}