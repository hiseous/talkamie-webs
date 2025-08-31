'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import PendingRequests from "../requests/PendingRequests";
import SearchBox from "../search/SearchBox";
import SeniorVolunteerItems from "../seniors-or-volunteers/SeniorVolunteerItems";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import HomeHeader from "./HomeHeader";
import ScheduledCards from "../schedules/ScheduledCards";
import { useEffect } from "react";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import UserVerificationProcess from "../user-verification/UserVerificationProcess";

type DashboardHomeProps = ComponentPrimitiveProps & {
    
};

const DashboardHome = (props: DashboardHomeProps) => {
    const localUser = useLocalUser();
    const routes = useAppRoutes();
    const dashboard = useDashboard();
    const searchFor = localUser?.type === 'volunteer' ? 'senior' : 'volunteer';
    const users = searchFor === 'senior' ? dashboard?.seniors : dashboard?.volunteers;
    const notInReview = (localUser?.type === 'senior' || localUser?.verification?.verified) ? true : false;

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(users && (!users?.wasTriggered || users.filter?.keyword)){
            // users.filter = {type: searchFor};
            users.getItems({reset: true})
        };

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(users?.pagination?.lastEvaluatedKey) users.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <DocWrapperVar1
            className={`${props.className || ''}`}
        >
            <HomeHeader />
            {/* <CallsSummary
                className="mt-6"
            /> */}
            {
                notInReview ?
                <>
                    <ScheduledCards
                        className="mt-6"
                    />
                    <PendingRequests
                        className="mt-6"
                    />
                </> :
                <>
                
                </>
            }
            <SearchBox
                className="mt-8 max-w-[400px]"
                // href={routes.volunteers()}
                // placeholder="Search for an amie"
                href={localUser?.type === 'volunteer' ? routes.seniors() : routes.volunteers()}
                placeholder={`Search for ${searchFor === 'senior' ? `a senior` : `an amie`}`}
                // nodeBeforeEnd={<>
                //     <SvgAsset
                //         name="SlidersHorizontal"
                //         size={16}
                //         className="cursor-pointer"
                //     />
                // </>}
            />
            {
                notInReview ?
                <>
                    <SeniorVolunteerItems
                        items={users?.items}
                        initiallyLoading={users?.initiallyLoading}
                        loading={users?.loading}
                        // updateItem={users?.updateItem}
                        className="mt-6"
                    />
                    {/* <UserRequestCards
                        className="mt-6"
                    /> */}
                </> :
                <>
                    <UserVerificationProcess
                        className="mt-8 max-w-[640px] p-8 border-[1.5px] border-whiteVar2 rounded-md"
                    />
                </>
            }
        </DocWrapperVar1>
    );
}

export default DashboardHome;