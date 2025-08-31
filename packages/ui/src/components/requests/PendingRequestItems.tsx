import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import SkeletonLoaderVolunteers from "../loader-skeleton/SkeletonLoaderVolunteers";
import NoResultVar1 from "../node/NoResultVar1";
import PendingRequestCards from "./PendingRequestCards";
import { connectRequestProps } from "../../utils/types/connect";

type PendingRequestItems = ComponentPrimitiveProps & {
    items?: connectRequestProps[];
    initiallyLoading?: boolean;
    loading?: boolean;
};

const PendingRequestItems = (props: PendingRequestItems) => {
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.initiallyLoading === false ?
                <>
                    {
                        props?.items?.length ?
                        <PendingRequestCards
                            items={props?.items}
                        /> :
                        <NoResultVar1>
                            you have no pending requests yet
                        </NoResultVar1>
                        // <div className="px-4 py-6 text-center">
                        //     no {localUser?.type === 'volunteer' ? 'seniors': 'volunteers'} found
                        // </div>
                    }
                    {
                        props.loading ?
                        <SkeletonLoaderVolunteers count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                props.initiallyLoading ?
                <SkeletonLoaderVolunteers count={8} /> :
                <></>
            }
        </div>
    );
}

export default PendingRequestItems;