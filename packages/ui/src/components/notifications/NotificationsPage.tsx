'use client';

import { useDashboard } from "../dashboard-provider/useDashboard";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import NoResult from "../node/NoResult";
import { useEffect } from "react";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import NotificationItem from "./NotificationItem";

const NotificationsPage = () => {
    const dashboard = useDashboard();

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!dashboard?.alerts?.wasTriggered) dashboard?.alerts?.getItems();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    // useEffect(() => {
    //     if(dashboard?.alerts?.filter.changed) dashboard?.alerts?.getItems(true);
    // }, [dashboard?.alerts?.filter.keyword]);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(dashboard?.alerts?.pagination?.lastEvaluatedKey) dashboard?.alerts.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <DocWrapperVar1>
            <HeadingAndBackButtonVar1>
                Notifications
            </HeadingAndBackButtonVar1>
            {/* <SearchBox
                placeholder="Search"
                className="max-w-[500px] mt-4"
                onChange={(keyword) => {
                    dashboard?.alerts?.onKeywordChange(keyword);
                }}
            /> */}
            <div className="mt-6">
                {
                    dashboard?.alerts?.initiallyLoading === false ?
                    <>
                        {
                            dashboard?.alerts?.items?.length ?
                            <>
                                <div className="grid grid-cols-1 gap-4">
                                    {
                                        dashboard?.alerts?.items.map((item, i) => {
                                            return (
                                                <NotificationItem
                                                    key={`${i}_${item.id}`}
                                                    item={item}
                                                />
                                            )
                                        })
                                    }
                                    {
                                        dashboard?.alerts?.loading ?
                                        <SkeletonLoaderUserItems count={2} className="" /> :
                                        <></>
                                    }
                                </div>
                            </> :
                            <NoResult
                                label={<>
                                    <div className="flex-1 w-full">
                                        <span>
                                            You have no notifications yet.
                                        </span>
                                    </div>
                                </>}
                            />
                        }
                    </> :
                    dashboard?.alerts?.initiallyLoading ?
                    <SkeletonLoaderUserItems count={8} /> :
                    <></>
                }
            </div>
        </DocWrapperVar1>
    );
}

export default NotificationsPage;