'use client';

import { useEffect, useState } from "react";
import { SchedulePageProps } from "./SchedulePage";
import { fromScheduleFormToReqBody, fromScheduleToForm } from "../../utils/funcs/schedule/conversion";
import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";
import { valueOf } from "../../utils/types/global.types";
import { useUpdateScheduleApi } from "../../utils/api/schedule/update";
import { useDashboard } from "../dashboard-provider/useDashboard";

type mode = 'edit';
export const useSchedulePage = (props: SchedulePageProps) => {
    const dashboard = useDashboard();
    const [states, setStates] = useState({
        form: fromScheduleToForm(props.data),
        mode: undefined as mode | undefined,
    });
    const updateApi = useUpdateScheduleApi();
    
    const handles = {
        onChange: (name: keyof scheduleCallForm, value?: valueOf<scheduleCallForm>) => {
            setStates(prev => ({
                ...prev,
                form: {
                    ...prev.form,
                    [name]: value,
                },
            }));
        },
        onButtonClick: () => {
            if(states.mode === 'edit'){
                //submit the form;
                if(props.data.id){
                    updateApi.trigger({
                        itemId: props.data.id,
                        body: fromScheduleFormToReqBody(states.form),
                    });
                }
            }
            else {
                setStates(prev => ({
                    ...prev,
                    mode :'edit',
                }))
            }
        },
    };

    useEffect(() => {
        if(updateApi.loading === false && updateApi.success){
            const newSchedule = updateApi.data;

            if(newSchedule){
                if(dashboard?.schedules.wasTriggered) dashboard.schedules.addItem(newSchedule);
                if(dashboard?.upcomingSchedules.wasTriggered) dashboard.upcomingSchedules.addItem(newSchedule);
            }

            setStates(prev => ({
                ...prev,
                form: fromScheduleToForm(newSchedule || props.data),
                mode: undefined,
            }));
        }
    }, [updateApi.loading]);

    return {
        ...handles,
        ...states,
        loading: updateApi.loading,
    };
};