import { __apiUrls } from "../../constants/api-urls";
import { itemId } from "../../types/global.types";
import { scheduleProps } from "../../types/schedule";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    itemId: itemId;
}

export const useGetScheduleApi = () => {
    const api = useFetchApi<scheduleProps>({
        fallBackToastError: `could not get schedule`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.schedule(triggerProps.itemId),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}