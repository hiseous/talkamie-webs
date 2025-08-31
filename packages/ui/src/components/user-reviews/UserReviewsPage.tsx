
'use client';

import { useEffect } from "react";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import NoResult from "../node/NoResult";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import { estimateCount } from "../../utils/funcs/digit";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import { useUserProfile } from "../user-profile-provider/useUserProfile";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import RatingStars from "../node/RatingStars";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import SvgAsset from "../../assets/svg/SvgAsset";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import WriteReviewModal from "./WriteReviewModal";
import UserReviewItems from "./UserReviewItems";

type UserReviewsPageProps = {
    context: ReturnType<typeof useUserProfile> | undefined;
}

const UserReviewsPage = (props: UserReviewsPageProps) => {
    const dashboard = useDashboard();
    const localUser = useLocalUser();
    const popUp = usePopUp();
    const estReviews = estimateCount({count: props.context?.data?.totalReviews ?? 0}).toHuman;

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!props.context?.reviews.wasTriggered) props.context?.reviews.getItems();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    // useEffect(() => {
    //     if(props.context?.reviews.filter.changed) props.context?.reviews.getItems(true);
    // }, [props.context?.reviews.filter.keyword]);
    useEffect(() => {
        if(
            typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(props.context?.reviews.pagination?.lastEvaluatedKey) props.context?.reviews?.getItems();
            // else dashboard.body.removeScrollEvent();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <DocWrapperVar1>
            <HeadingAndBackButtonVar1>
                Reviews
            </HeadingAndBackButtonVar1>
            <div className="mt-4">
                Total Reviews {`(${estReviews})`}
            </div>
            <div className="flex items-center font-semibold">
                <div className="text-xl">{props.context?.data?.rating?.toFixed(1)}</div>
                <RatingStars
                    className="ml-2"
                    rating={props.context?.data?.rating}
                    // var="2"
                />
            </div>
            {
                localUser?.id && props.context?.data?.viewer?.connectRequest?.status === 'accepted' && !props.context?.data?.viewer?.review?.id ?
                <div
                    className="mt-4 flex items-center fill-redVar1 text-redVar1 cursor-pointer"
                    onClick={() => {
                        if(props.context?.data?.id){
                            popUp?.set({
                                nodes: [
                                    <WriteReviewModal
                                        userId={props.context.data.id}
                                        onClose={popUp.reset}
                                        onSent={(resp) => {
                                            if(resp?.review?.id){
                                                props.context?.reviews.addItem(resp.review);
                                                props.context?.updateUser({
                                                    ...resp.user,
                                                    viewer: {
                                                        ...props.context.data?.viewer,
                                                        review: {
                                                            ...props.context.data?.viewer?.review,
                                                            id: resp.review.id,
                                                        },
                                                    },
                                                });
                                                popUp.reset();
                                            }
                                        }}
                                    />,
                                ],
                            })
                        }
                    }}
                >
                    <SvgAsset name="PenLine" />
                    <div>Write a Review</div>
                </div> : undefined
            }
            <div className="mt-6">
                {
                    props.context?.reviews.initiallyLoading === false ?
                    <>
                        {
                            props.context?.reviews.items?.length ?
                            <>
                                <UserReviewItems
                                    items={props.context.reviews.items}
                                />
                            </> :
                            <NoResult
                                label={<>
                                    <div className="flex-1 w-full">
                                        <span>
                                            No reviews yet.
                                        </span>
                                    </div>
                                </>}
                            />
                        }
                    </> :
                    props.context?.reviews.initiallyLoading ?
                    <SkeletonLoaderUserItems count={8} /> :
                    <></>
                }
            </div>
        </DocWrapperVar1>
    );
}

export default UserReviewsPage;