'use client';

import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import NoResult from "../node/NoResult";
import { useEffect } from "react";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useGetCallApi } from "../../utils/api/call/get";
import { useParams } from "next/navigation";
import CallInfo from "./CallInfo";

const HistoryCallPage = () => {
    const params = useParams();
    const paramId = params.id as string | undefined;
    const getApi = useGetCallApi({useToastError: false});
    
    useEffect(() => {
        if(paramId){
            getApi.trigger({
                itemId: paramId,
            });
        }
    }, [paramId]);
    
    return (
        <DocWrapperVar1 className="h-full">
            <HeadingAndBackButtonVar1>
                Call Info
            </HeadingAndBackButtonVar1>
            <div className="mt-6">
                {
                    getApi?.loading === false ?
                    <>
                        {
                            getApi?.data ?
                            <>
                                <CallInfo
                                    item={getApi.data}
                                />
                            </> :
                            <NoResult
                                label={<>
                                    <div className="flex-1 w-full">
                                        <span>
                                            Call not found!
                                        </span>
                                    </div>
                                </>}
                            />
                        }
                    </> :
                    getApi?.loading ?
                    <SkeletonLoaderUserItems count={1} /> :
                    <></>
                }
            </div>
        </DocWrapperVar1>
    );
}

export default HistoryCallPage;