'use client';

import NoResult from "../node/NoResult";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useEffect } from "react";
import { apiFinanceSubpath } from "../../utils/types/api";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";
import { useDashTransactions } from "../dashboard-provider/useDashTransactions";
import TransactionItem from "./TransactionItem";
import SkeletonLoaderTransactionItems from "../loader-skeleton/SkeletonLoaderTransactionItems";

type AccountFinanceTransactionItemsTemplateProps = ComponentPrimitiveProps & {
    focused?: boolean;
    hook: ReturnType<typeof useDashTransactions> | undefined;
    // noResultLabel?: React.ReactNode;
    currentTab: apiFinanceSubpath | undefined;
}
const AccountFinanceTransactionItemsTemplate = (props: AccountFinanceTransactionItemsTemplateProps) => {
    const dashboard = useDashboard();
    
    useEffect(() => {
        if(
            props.focused
            && (
                !props.hook?.wasTriggered
                || (
                    typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
                    && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
                    && props.hook?.pagination?.lastEvaluatedKey
                )
            )
        ){
            props.hook?.get();
        }
    }, [props.focused, props.hook?.key, dashboard?.body.scrollDistanceFrom?.bottom]);

    return (
        <div className={`${props.className || ''} ${props.focused ? '' : 'hidden'}`}>
            {
                props.hook?.initiallyLoading === false ?
                <>
                    {
                        props.hook?.items?.length ?
                        <>
                            <div className="mt-6 grid grid-cols-1 gap-8">
                                {
                                    props.hook?.items.map((item, i) => {
                                        return (
                                            <TransactionItem
                                                key={`${i}_${item.id}`}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </> :
                        <NoResult
                            label={`no transactions yet`}
                        />
                    }
                    {
                        props.hook?.loading ?
                        <SkeletonLoaderTransactionItems count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                props.hook?.initiallyLoading ?
                <SkeletonLoaderTransactionItems count={8} /> :
                <></>
            }
        </div>
    );
}

export default AccountFinanceTransactionItemsTemplate;