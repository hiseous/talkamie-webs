'use client';

import { useEffect, useState } from "react";
import { useGetUserAvailabilityCustomItemsApi } from "../../utils/api/user-availability/get-custom-items";
import { usePostUserAvailabilityCustomItemsApi } from "../../utils/api/user-availability/post-custom-items";
import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
import { fromUserAvailabilityCustomFormItems, fromUserAvailabilityCustomObjectItems } from "../../utils/funcs/time/range";
import { fromIsoDateTimeToIsoDate } from "../../utils/funcs/time/timestamp";
import { dateTimeRangeProps, dateTimeRanges, isoDate } from "../../utils/types/time";
import { useLocalUser } from "../local-user-provider/useLocalUser";

export type userAvailabilityCustomObjectItems = {
    [key in isoDate]?: dateTimeRanges;
}
export type userAvailabilityCustomArrayItems = {
    [key in isoDate]?: dateTimeRangeProps[];
}

export const useCustomAvailabilitySettings = () => {
    const localUser = useLocalUser();
    const getApi = useGetUserAvailabilityCustomItemsApi();
    const postApi = usePostUserAvailabilityCustomItemsApi();
    const toast = useToastMessage();
    const [customObjectItems, setCustomObjectItems] = useState<userAvailabilityCustomObjectItems>({});

    const handles = {
        fromCustomObjectItems: fromUserAvailabilityCustomObjectItems,
        fromFormItems: fromUserAvailabilityCustomFormItems,
        addDateTimeRange: (dateTimeRange: dateTimeRangeProps) => {
            setCustomObjectItems(prev => {
                if(dateTimeRange.start){
                    const isoDate = fromIsoDateTimeToIsoDate(dateTimeRange.start);
                    prev[isoDate] = {
                        ...prev[isoDate],
                        ...(
                            dateTimeRange.start ? {
                                [dateTimeRange.start]: dateTimeRange,
                            } : {}
                        )
                    };
                }

                return {...prev};
            });
        },
        removeDateTimeRange: (dateTimeRange: dateTimeRangeProps) => {
            setCustomObjectItems(prev => {
                if(dateTimeRange.start){
                    const isoDate = fromIsoDateTimeToIsoDate(dateTimeRange.start);
                    if(prev[isoDate]) delete prev[isoDate][dateTimeRange.start];
                }
                
                return {...prev};
            })
        },
        submit: () => {
            if(localUser?.id){
                setCustomObjectItems(prev => {
                    postApi.trigger({
                        body: handles.fromCustomObjectItems(prev).formItems,
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
            setCustomObjectItems(handles.fromFormItems(getApi.data, {
                omitPastRange: true,
            }).customObjectItems);
        }
    }, [getApi.loading]);
    useEffect(() => {
        if(postApi.loading === false && postApi.success){
            toast.success(`Your custom availability has been updated!`);
        }
    }, [postApi.loading]);

    return {
        ...handles,
        get: {
            loading: getApi.loading,
        },
        saving: postApi.loading,
        customObjectItems,
        ...handles.fromCustomObjectItems(customObjectItems),
    };
};