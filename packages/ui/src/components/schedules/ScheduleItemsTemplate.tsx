'use client';

import NoResult from "../node/NoResult";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useEffect } from "react";
import { apiSchedulesSubpath } from "../../utils/types/api";
import { useDashSchedules } from "../dashboard-provider/useDashSchedules";
import ScheduledCardVar1 from "./ScheduledCardVar1";
import SkeletonLoaderSchedules from "../loader-skeleton/SkeletonLoaderSchedules";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ScheduleCallCard from "./ScheduleCallCard";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import ScheduleItemsWrapper from "./ScheduleItemsWrapper";

type ScheduleItemsTemplateProps = ComponentPrimitiveProps & {
    focused?: boolean;
    hook: ReturnType<typeof useDashSchedules> | undefined;
    noResultLabel?: React.ReactNode;
    currentTab: apiSchedulesSubpath | undefined;
}
const ScheduleItemsTemplate = (props: ScheduleItemsTemplateProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();
    
    useEffect(() => {
        if(
            props.focused
            && (
                !props.hook?.wasTriggered
                || (
                    typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
                    && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
                    && props.hook?.pagination?.lastEvaluatedKey
                )
            )
        ){
            props.hook?.getItems();
        }
    }, [props.focused, props.hook?.key]);

    return (
        <div className={`${props.className || ''} ${props.focused ? '' : 'hidden'}`}>
            {
                props.hook?.initiallyLoading === false ?
                <>
                    {
                        props.hook?.items?.length ?
                        <>
                            <ScheduleItemsWrapper>
                                {
                                    localUser?.type === 'senior' ?
                                    <ScheduleCallCard /> : <></>
                                }
                                {
                                    props.hook?.items.map((item, i) => {
                                        return (
                                            <ScheduledCardVar1
                                                key={`${i}_${item.id}`}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                            </ScheduleItemsWrapper>
                        </> :
                        <NoResult
                            label={props.noResultLabel}
                        />
                    }
                    {
                        props.hook?.loading ?
                        <SkeletonLoaderSchedules count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                props.hook?.initiallyLoading ?
                <SkeletonLoaderSchedules count={8} /> :
                <></>
            }
        </div>
    );
}

export default ScheduleItemsTemplate;