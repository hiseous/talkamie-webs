'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useDashboard } from "../dashboard-provider/useDashboard";
import HeadingVar1 from "../heading/HeadingVar1";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import PendingRequestItems from "./PendingRequestItems";

type PendingRequestsProps = ComponentPrimitiveProps & {
    
};

const PendingRequests = (props: PendingRequestsProps) => {
    const localUser = useLocalUser();
    const pendingReqs = useDashboard()?.pendingReqs;

    useEffect(() => {
        if(!pendingReqs?.wasTriggered) pendingReqs?.getItems();
    }, []);
    
    return (
        <>
            {
                pendingReqs?.items?.length ?
                <div className={`${props.className || ''}`}>
                    <HeadingVar1>
                        Pending Requests
                        {
                            localUser?.totalPendingRequests ?
                            <span className="text-redVar1 font-semibold">{` (${localUser.totalPendingRequests})`}</span> : undefined
                        }
                    </HeadingVar1>
                    <PendingRequestItems
                        items={pendingReqs?.items}
                        initiallyLoading={pendingReqs?.initiallyLoading}
                        loading={pendingReqs?.loading}
                        className="mt-4"
                    />
                </div> : <></>
            }
        </>
    );
}

export default PendingRequests;