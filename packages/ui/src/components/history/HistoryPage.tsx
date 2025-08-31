'use client';

import { useDashboard } from "../dashboard-provider/useDashboard";
import SearchBox from "../search/SearchBox";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import NoResult from "../node/NoResult";
import { useEffect } from "react";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import CallHistoryItem from "./CallHistoryItem";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";

const HistoryPage = () => {
    const dashboard = useDashboard();

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!dashboard?.callHistories?.wasTriggered) dashboard?.callHistories?.getItems();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(dashboard?.callHistories?.filter.changed) dashboard?.callHistories?.getItems(true);
    }, [dashboard?.callHistories?.filter.keyword]);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(dashboard?.callHistories?.pagination?.lastEvaluatedKey) dashboard?.callHistories.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <DocWrapperVar1>
            <HeadingAndBackButtonVar1>
                History
            </HeadingAndBackButtonVar1>
            <SearchBox
                placeholder="Search"
                className="max-w-[500px] mt-4"
                onChange={(keyword) => {
                    dashboard?.callHistories?.onKeywordChange(keyword);
                }}
            />
            <div className="mt-6">
                {
                    dashboard?.callHistories?.initiallyLoading === false ?
                    <>
                        {
                            dashboard?.callHistories?.items?.length ?
                            <>
                                <div className="grid grid-cols-1 gap-8">
                                    {
                                        dashboard?.callHistories?.items.map((item, i) => {
                                            return (
                                                <CallHistoryItem
                                                    key={`${i}_${item.id}`}
                                                    item={item}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </> :
                            <NoResult
                                label={<>
                                    <div className="flex-1 w-full">
                                        <span>
                                            You have no call history yet.
                                        </span>
                                    </div>
                                </>}
                            />
                        }
                        {
                            dashboard?.callHistories?.loading ?
                            <SkeletonLoaderUserItems count={2} className="mt-4" /> :
                            <></>
                        }
                    </> :
                    dashboard?.callHistories?.initiallyLoading ?
                    <SkeletonLoaderUserItems count={8} /> :
                    <></>
                }
            </div>
        </DocWrapperVar1>
    );
}

export default HistoryPage;