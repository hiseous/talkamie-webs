
'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import NoResult from "../node/NoResult";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { estimateCount } from "../../utils/funcs/digit";
import UserReviewItems from "../user-reviews/UserReviewItems";

type AccountProfileReviewsProps = ComponentPrimitiveProps & {

}

const AccountProfileReviews = (props: AccountProfileReviewsProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!dashboard?.localReviews?.wasTriggered) dashboard?.localReviews?.getItems();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    // useEffect(() => {
    //     if(dashboard?.localReviews?.filter.changed) dashboard?.localReviews?.getItems(true);
    // }, [dashboard?.localReviews?.filter.keyword]);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(dashboard?.localReviews?.pagination?.lastEvaluatedKey) dashboard?.localReviews.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <div className={`${props.className || ''}`}>
            <div>
                Total Reviews {`(${estimateCount({count: localUser?.totalReviews ?? 0}).toHuman})`}
            </div>
            <div className="mt-6">
                {
                    dashboard?.localReviews?.initiallyLoading === false ?
                    <>
                        {
                            dashboard.localReviews.items?.length ?
                            <>
                                <UserReviewItems
                                    items={dashboard.localReviews.items}
                                />
                            </> :
                            <NoResult
                                label={<>
                                    <div className="flex-1 w-full">
                                        <span>
                                            You have no reviews yet.
                                        </span>
                                    </div>
                                </>}
                            />
                        }
                    </> :
                    dashboard?.localReviews?.initiallyLoading ?
                    <SkeletonLoaderUserItems count={8} /> :
                    <></>
                }
            </div>
        </div>
    );
}

export default AccountProfileReviews;