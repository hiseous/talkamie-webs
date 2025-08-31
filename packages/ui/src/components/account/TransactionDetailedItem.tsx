'use client';

import { numberMayFloat, roundNumber } from "../../utils/funcs/digit/round-number";
import { capitalizeString } from "../../utils/funcs/string/string";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import { transactionProps } from "../../utils/types/finance";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type TransactionDetailedItemProps = ComponentPrimitiveProps & {
    item: transactionProps | undefined;
}

const TransactionDetailedItem = (props: TransactionDetailedItemProps) => {
    const timeProps = props.item?.timestamp ? fromTimestamp(props.item.timestamp) : undefined;
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="flex items-center justify-between font-medium">
                <div className="">
                    {
                        props.item?.intent === 'subscription' ? 'Subscription Payment' :
                        props.item?.intent === 'top-up' ? 'Direct Purchase' :
                        props.item?.intent === 'withdraw' ? 'Withdrawal' :
                        capitalizeString(props.item?.type).newString
                    }
                </div>
                <div className="text-redVar1">
                    +{numberMayFloat((props.item?.coins?.amount ?? 0), 2, false)}
                    <span className="uppercase"> tc</span>
                </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-grayVar1">
                <div>
                    <span>{timeProps?.date.iso} </span>
                    | <span className="uppercase">{timeProps?.time.in12Hr.replaceAll(' ', '')}</span>
                </div>
                {
                    typeof props.item?.funds?.amount === 'number' ?
                    <div>
                        ${roundNumber((props.item?.funds?.amount ?? 0) / 100, 2, false).toFixed(2)}
                    </div> : undefined
                }
            </div>
            <div className="mt-1 flex items-center text-grayVar1 uppercase text-xxsm">
                <div>
                    status:
                </div>
                <div className="pl-2 font-semibold">
                    {
                        props.item?.status === 'pending' || props.item?.status === 'processing' ? 'pending' :
                        props.item?.status === 'succeeded' ? 'success' :
                        'failed'
                    }
                </div>
            </div>
        </div>
    );
}

export default TransactionDetailedItem;