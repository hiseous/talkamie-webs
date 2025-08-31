'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useDashboard } from "../dashboard-provider/useDashboard";
import HeadingVar1 from "../heading/HeadingVar1";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ScheduleCallCard from "./ScheduleCallCard";
import ScheduledCard from "./ScheduledCard";

type ScheduledCardsProps = ComponentPrimitiveProps & {
    // type?: apiSchedulesSubpath;
};

const ScheduledCards = (props: ScheduledCardsProps) => {
    const localUser = useLocalUser();
    const upcomingSchedules = useDashboard()?.upcomingSchedules;

    useEffect(() => {
        if(!upcomingSchedules?.wasTriggered) upcomingSchedules?.getItems();
    }, []);
    
    return (
        <>
            {
                upcomingSchedules?.items?.length || localUser?.type === 'senior' ?
                <div
                    className={`${props.className || ''}`}
                >
                    <HeadingVar1>
                        Upcoming Calls
                    </HeadingVar1>
                    <div className="mt-5 flex items-stretch customScrollbar overflow-x-auto scrollbar-hidden md:!scrollbar-visible [&>*]:shrink-0">
                        {
                            localUser?.type === 'senior' ?
                            <ScheduleCallCard
                                className={`${upcomingSchedules?.items?.length ? 'w-[calc(100%-40px)]' : 'w-full'} sm:w-[400px]`}
                            /> : <></>
                        }
                        {
                            upcomingSchedules?.items?.map((item, i) => {
                                return (
                                    <ScheduledCard
                                        key={`${i}_${item.id}`}
                                        item={item}
                                        className={`${(i > 0 || localUser?.type === 'senior') ? 'ml-5' : ''} w-[calc(100%-40px)] sm:w-[400px]`}
                                    />
                                )
                            })
                        }
                    </div>
                </div> : <></>
            }
        </>
    );
}

export default ScheduledCards;