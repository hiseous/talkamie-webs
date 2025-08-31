import { __apiUrls } from "../../constants/api-urls";
import { callProps } from "../../types/call";
import { itemId } from "../../types/global.types";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
}

export const useGetCallApi = (props?: useFetchApiProps) => {
    const api = useFetchApi<callProps>({
        fallBackToastError: `could not get call`,
        ...props,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.call(triggerProps.itemId),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}