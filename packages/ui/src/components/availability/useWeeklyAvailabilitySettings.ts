'use client';

import { useEffect, useState } from "react";
import { useGetUserAvailabilityWeeklyItemsApi } from "../../utils/api/user-availability/get-weekly-items";
import { usePostUserAvailabilityWeeklyItemsApi } from "../../utils/api/user-availability/post-weekly-items";
import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
import { fromUserAvailabilityWeeklyFormItems, fromUserAvailabilityWeeklyObjectItems } from "../../utils/funcs/time/range";
import { dateTimeRangeProps, isoDateTime, weekDayAbbr } from "../../utils/types/time";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type dateTimeRanges = {
    [startDateTime in isoDateTime]?: dateTimeRangeProps;
}
export type userAvailabilityWeeklyObjectItems = {
    [key in weekDayAbbr]?: dateTimeRanges;
}
export type userAvailabilityWeeklyArrayItems = {
    [key in weekDayAbbr]?: dateTimeRangeProps[];
}

export const useWeeklyAvailabilitySettings = () => {
    const localUser = useLocalUser();
    const getApi = useGetUserAvailabilityWeeklyItemsApi();
    const postApi = usePostUserAvailabilityWeeklyItemsApi();
    const toast = useToastMessage();
    const [weeklyObjectItems, setWeeklyObjectItems] = useState<userAvailabilityWeeklyObjectItems>({});

    const handles = {
        fromWeeklyObjectItems: fromUserAvailabilityWeeklyObjectItems,
        fromFormItems: fromUserAvailabilityWeeklyFormItems,
        addDateTimeRange: (weekDayAbbr: weekDayAbbr, dateTimeRange: dateTimeRangeProps) => {
            setWeeklyObjectItems(prev => ({
                ...prev,
                [weekDayAbbr]: {
                    ...prev[weekDayAbbr],
                    ...(
                        dateTimeRange.start ? {
                            [dateTimeRange.start]: dateTimeRange,
                        } : {}
                    )
                },
            }))
        },
        removeDateTimeRange: (weekDayAbbr: weekDayAbbr, dateTimeRange: dateTimeRangeProps) => {
            setWeeklyObjectItems(prev => {
                if(dateTimeRange.start && prev[weekDayAbbr]?.[dateTimeRange.start]){
                    delete prev[weekDayAbbr][dateTimeRange.start];
                }
                return {...prev};
            })
        },
        submit: () => {
            if(localUser?.id){
                setWeeklyObjectItems(prev => {
                    postApi.trigger({
                        body: handles.fromWeeklyObjectItems(prev).formItems,
                    });
                    return {...prev};
                })
            }
        },
    };

    useEffect(() => {
        if(localUser?.id) getApi.trigger();
    }, []);
    useEffect(() => {
        if(getApi.loading === false && getApi.success){
            setWeeklyObjectItems(handles.fromFormItems(getApi.data).weeklyObjectItems);
        }
    }, [getApi.loading]);
    useEffect(() => {
        if(postApi.loading === false && postApi.success){
            toast.success(`Your weekly availability has been updated!`);
        }
    }, [postApi.loading]);

    return {
        ...handles,
        get: {
            loading: getApi.loading,
        },
        saving: postApi.loading,
        weeklyObjectItems,
        ...handles.fromWeeklyObjectItems(weeklyObjectItems),
    };
};