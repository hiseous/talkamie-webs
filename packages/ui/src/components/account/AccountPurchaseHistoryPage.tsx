'use client';

import { useEffect } from "react";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import TransactionItem from "./TransactionItem";
import NoResult from "../node/NoResult";
import SkeletonLoaderTransactionItems from "../loader-skeleton/SkeletonLoaderTransactionItems";

const AccountPurchaseHistoryPage = () => {
    const dashboard = useDashboard();

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        if(!dashboard?.transactionPurchases.wasTriggered) dashboard?.transactionPurchases.get();

        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(
            !dashboard?.transactionPurchases.loading
            && typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
            && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
        ){
            if(dashboard?.transactionPurchases.pagination?.lastEvaluatedKey) dashboard?.transactionPurchases?.get();
        }
    }, [dashboard?.body.scrollDistanceFrom?.bottom]);
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Purchase History
            </HeadingAndBackButtonVar1>
            <div className="mt-4">
                {
                    dashboard?.transactionPurchases?.initiallyLoading === false ?
                    <>
                        {
                            dashboard?.transactionPurchases?.items?.length ?
                            <>
                                <div className="mt-6 grid grid-cols-1 gap-6">
                                    {
                                        dashboard?.transactionPurchases?.items.map((item, i) => {
                                            return (
                                                <TransactionItem
                                                    key={`${i}_${item.id}`}
                                                    item={item}
                                                />
                                            )
                                        })
                                    }
                                    {
                                        dashboard?.transactionPurchases?.loading ?
                                        <SkeletonLoaderTransactionItems count={2} className="mt-4" /> :
                                        <></>
                                    }
                                </div>
                            </> :
                            <NoResult
                                label={`no purchases yet`}
                            />
                        }
                    </> :
                    dashboard?.transactionPurchases?.initiallyLoading ?
                    <SkeletonLoaderTransactionItems count={8} /> :
                    <></>
                }
            </div>
        </>
    );
}

export default AccountPurchaseHistoryPage;