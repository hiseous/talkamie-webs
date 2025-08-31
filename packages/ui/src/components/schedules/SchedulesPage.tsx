'use client';

import { useSearchParams } from "next/navigation";
import Button from "../button/Button";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ControlledTabs from "../node/ControlledTabs";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import SearchBox from "../search/SearchBox";
import UserConnectionsModal from "../user-connections/UserConnectionsModal";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import { apiSchedulesSubpath } from "../../utils/types/api";
import { __routes } from "../../utils/constants/app-routes";
import ScheduleItemsTemplate from "./ScheduleItemsTemplate";
import { useEffect } from "react";

const SchedulesPage = () => {
    const localUser = useLocalUser();
    const popUp = usePopUp();
    const dashboard = useDashboard();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab') as apiSchedulesSubpath | undefined;
    const tab: apiSchedulesSubpath | undefined= (['past', 'upcoming'] as (apiSchedulesSubpath | undefined)[]).includes(tabParam) ? tabParam : undefined;
    const noResultLabel = (
        <div className="flex-1 w-full">
            <span>
                {
                    dashboard?.schedulesUtils.filter.keyword ? `There are no schedules with that keyword` :
                    `You have no ${tab || ''} schedules yet`
                }
            </span>
            {
                localUser?.type === 'senior' ?
                <Button
                    theme="red"
                    className="mt-6 px-24 rounded-md w-[max-content]"
                    onClick={() => {
                        popUp?.set({
                            nodes: [
                                <UserConnectionsModal title="Schedule a Call" itemLink="schedule" />,
                            ],
                        });
                    }}
                >
                    Schedule a Call
                </Button> : <></>
            }
        </div>
    );

    
    useEffect(() => {
        dashboard?.body.addScrollEvent();
        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(dashboard?.schedulesUtils.filter.changed){
            dashboard?.schedules.reset();
            dashboard?.pastSchedules.reset();
            dashboard?.upcomingSchedules.reset();
        }
    }, [dashboard?.schedulesUtils.filter.keyword]);
    
    return (
        <DocWrapperVar1>
            <SearchBox
                placeholder="Search"
                className="max-w-[500px] mb-8"
                onChange={(keyword) => {
                    dashboard?.schedulesUtils.onKeywordChange(keyword);
                }}
            />
            <ControlledTabs
                tabs={[
                    {label: 'All', href: __routes.schedules()},
                    {value: 'upcoming', href: __routes.schedules(undefined, {tab: 'upcoming'})},
                    {value: 'past', href: __routes.schedules(undefined, {tab: 'past'})},
                ]}
                className="my-8"
                value={tab}
                // onChange={(tab?: apiChatsSubpath) => navigate.replace(__routes.schedules(undefined, {tab}))}
            />
            <ScheduleItemsTemplate
                focused={tab === undefined}
                currentTab={tab}
                hook={dashboard?.schedules}
                noResultLabel={noResultLabel}
            />
            <ScheduleItemsTemplate
                focused={tab === 'upcoming'}
                currentTab={tab}
                hook={dashboard?.upcomingSchedules}
                noResultLabel={noResultLabel}
            />
            <ScheduleItemsTemplate
                focused={tab === 'past'}
                currentTab={tab}
                hook={dashboard?.pastSchedules}
                noResultLabel={noResultLabel}
            />
        </DocWrapperVar1>
    );
}

export default SchedulesPage;