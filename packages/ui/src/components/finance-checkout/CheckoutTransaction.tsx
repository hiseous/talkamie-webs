'use client';

import { numberMayFloat } from "../../utils/funcs/digit/round-number";
import { transactionProps } from "../../utils/types/finance";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon from "../icon/Icon";

type CheckoutTransactionProps = ComponentPrimitiveProps & {
    item: transactionProps;
    type?: 'success' | 'cancel';
}
const CheckoutTransaction = (props: CheckoutTransactionProps) => {
    
    return (
        <div className={`${props.className || ''} flex flex-col items-center justify-center text-grayVar8 font-semibold`}>
            {
                props.type === 'success' ?
                <div className="text-4xl md:text-6xl font-bold">
                    +{numberMayFloat((props.item.coins?.amount ?? 0), 2, false)}
                    <span className="uppercase text-sm md:text-2xl"> tc</span>
                </div> : undefined
            }
            {/* <div>
                {
                    props.item.intent === 'subscription' ? `Subscription` : 'Account balance top-up'
                }
            </div> */}
            <Icon
                iconName={props.type === 'success' ? 'CheckCircleFill' : 'XCircleFill'}
                className={`mt-4 w-[120px] h-[120px] md:w-[180px] md:h-[180px]
                    ${props.type === 'success' ? 'fill-greenVar3' : 'fill-redVar3'}    
                `}
            />
            <div className="mt-4 text-lg md:text-xl">
                Payment {props.type === 'success' ? 'successful' : 'canceled'}
            </div>
            {/* <div className="text-2xl md:text-3xl font-bold">
                ${numberMayFloat((props.item.funds?.amount ?? 0) / 100, 2, false)}
            </div> */}
        </div>
    );
}

export default CheckoutTransaction;