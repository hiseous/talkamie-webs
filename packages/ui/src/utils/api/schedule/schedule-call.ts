
import { __apiUrls } from "../../constants/api-urls";
import { chatMessageProps, chatProps } from "../../types/chat";
import { itemId } from "../../types/global.types";
import { scheduleProps } from "../../types/schedule";
import { iso24HrTime, isoDate, isoDateTime } from "../../types/time";
import { useFetchApi } from "../useFetchApi";

type commonFormProps = Pick<scheduleProps, 'title' | 'type'> & {
    // timezoneOffset?: number; //in minutes (+ve or -ve);
    // weeklyRecurringDay?: scheduleProps['weeklyRecurringDay'] | 'none';
    recurrence?: scheduleProps['recurrence'] | 'none';
}
export type scheduleCallForm = commonFormProps & {
    startDate?: isoDate; //YYYY-MM-DD;
    startTime?: iso24HrTime; //HH:MM:SS;
    endTime?: iso24HrTime; //HH:MM:SS;
}
export type scheduleCallReqBody = commonFormProps & {
    startDateTime?: isoDateTime; //utc date-time;
    endDateTime?: isoDateTime; //utc date-time;
}
type triggerProps = {
    attendeeId: itemId;
    body: scheduleCallReqBody;
}
type respData = {
    schedule?: scheduleProps;
    chat?: Pick<chatProps, 'id'>;
    message?: chatMessageProps;
}

export const useScheduleCallApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not schedule call`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.user(triggerProps.attendeeId, ['schedule']),
                body: triggerProps.body,
                method: 'post',
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}