'use client';

import { useEffect, useState } from "react";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { valueOf } from "../../utils/types/global.types";
import { useRouter } from "next/navigation";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { userProps } from "../../utils/types/user";
import { scheduleCallForm, useScheduleCallApi } from "../../utils/api/schedule/schedule-call";
import { fromScheduleFormToReqBody } from "../../utils/funcs/schedule/conversion";
import { useDashboard } from "../dashboard-provider/useDashboard";

type useScheduleUserProps = {
    user: userProps | undefined;
    // updateUser?: (userProps?: Partial<userProps>) => void;
}

export const useScheduleUser = (props: useScheduleUserProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();
    const scheduleApi = useScheduleCallApi();
    const router = useRouter();
    const routes = useAppRoutes();

    // const defaultSchedule = props.user?.viewer?.schedule;
    // const startProps = defaultSchedule?.timeslot?.from ? fromTimestamp(defaultSchedule?.timeslot?.from) : undefined;
    // const endProps = defaultSchedule?.timeslot?.to ? fromTimestamp(defaultSchedule?.timeslot?.to) : undefined;

    const [form, setForm] = useState<scheduleCallForm>({
        // ...(
        //     defaultSchedule?.status !== 'past' ? {
        //         title: defaultSchedule?.title,
        //         startDate: startProps?.date.iso,
        //         startTime: startProps?.time.iso,
        //         endTime: endProps?.time.iso,
        //         type: defaultSchedule?.type,
        //         weeklyRecurringDay: defaultSchedule?.weeklyRecurringDay,
        //     } : {}
        // ),
        title: props.user?.name ? `Meeting with ${props.user.name}` : ``,
        type: 'video',
        recurrence: 'none',
        // timezoneOffset: new Date().getTimezoneOffset(),
    });
    
    const handles = {
        onChange: (name: keyof scheduleCallForm, value?: valueOf<scheduleCallForm>) => {
            setForm(prev => ({
                ...prev,
                [name]: value,
            }));
        },
        submit: () => {
            if(localUser?.id && props.user?.id){
                scheduleApi.trigger({
                    attendeeId: props.user.id,
                    body: fromScheduleFormToReqBody(form),
                });
            }
        },
        validateForm: (form?: scheduleCallForm) => {
            const validated = (
                form?.startDate && form.startTime && form.endTime
            ) ? true : false;

            return validated;
        },
    };

    useEffect(() => {
        if(scheduleApi.loading === false && scheduleApi.success){
            if(scheduleApi.data?.schedule?.id && props.user?.id){
                if(dashboard?.schedules.wasTriggered) dashboard.schedules.addItem(scheduleApi.data.schedule);
                if(dashboard?.upcomingSchedules.wasTriggered) dashboard.upcomingSchedules.addItem(scheduleApi.data.schedule);
                if(scheduleApi.data?.chat?.id && scheduleApi.data.message?.id){
                    dashboard?.chats.addMessages({
                        chatId: scheduleApi.data.chat.id,
                        messages: scheduleApi.data.message ? [scheduleApi.data.message] : undefined,
                        asNewItems: true,
                    });
                }
                router.replace(routes.schedules())
                // if(props.updateUser) props.updateUser({
                //     viewer: {
                //         ...props.user?.viewer,
                //         schedule: {
                //             ...props.user?.viewer?.schedule,
                //             ...newSchedule,
                //         },
                //     },
                // });
            }
            else {
                router.back();
            }
        }
    }, [scheduleApi.loading]);

    return {
        ...handles,
        form,
        loading: scheduleApi.loading,
    };
};