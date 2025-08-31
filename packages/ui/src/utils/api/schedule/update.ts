import { __apiUrls } from "../../constants/api-urls";
import { itemId } from "../../types/global.types";
import { scheduleProps } from "../../types/schedule";
import { useFetchApi } from "../useFetchApi";
import { scheduleCallForm } from "./schedule-call";

type triggerProps = {
    itemId: itemId;
    body?: scheduleCallForm;
}

export const useUpdateScheduleApi = () => {
    const api = useFetchApi<scheduleProps>({
        fallBackToastError: `could not update schedule`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.schedule(triggerProps.itemId),
                body: triggerProps.body,
                method: 'put',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}