'use client';

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useGetScheduleApi } from "../../utils/api/schedule/get";

export type ScheduleLayoutContextType = ReturnType<typeof useScheduleLayoutContext> | undefined;
export const useScheduleLayoutContext = () => {
    const params = useParams();
    const paramId = params.id as string | undefined;
    
    const getApi = useGetScheduleApi();
    
    useEffect(() => {
        if(paramId){
            getApi.trigger({
                itemId: paramId,
            });
        }
    }, [paramId]);

    return {
        ...getApi,
    };
}