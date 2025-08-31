'use client';

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useGetTransactionApi } from "../../utils/api/finance/get-transaction";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import SkeletonLoaderVolunteers from "../loader-skeleton/SkeletonLoaderVolunteers";
import NoResult from "../node/NoResult";
import TransactionDetailedItem from "./TransactionDetailedItem";

const AccountTransactionPage = () => {
    const getApi = useGetTransactionApi();
    const params = useParams();
    const paramId = params.id as string | undefined;
    // const searchParams = useSearchParams();
    // const itemId = searchParams.get('transactionId') || undefined;
    const transaction = getApi?.data?.transaction;

    useEffect(() => {
        if(paramId){
            getApi.trigger({
                id: paramId,
            });
        }
    }, [paramId]);
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Transaction
            </HeadingAndBackButtonVar1>
            <div>
                {
                    getApi?.loading === false ?
                    <div>
                        {
                            transaction?.id ?
                            <TransactionDetailedItem
                                item={transaction}
                            /> :
                            <NoResult
                                label="We couldn't find that transaction"
                            />
                        }
                    </div> :
                    getApi?.loading ?
                    <>
                        <SkeletonLoaderVolunteers count={1} />
                    </> :
                    <>
                    
                    </>
                }
            </div>
        </>
    );
}

export default AccountTransactionPage;