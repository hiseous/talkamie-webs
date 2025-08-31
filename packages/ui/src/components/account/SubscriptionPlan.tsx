
'use client';

import { useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import IconWrapper from "../icon/IconWrapper";
import { financeTierPeriodicRate, subscriptionPlanProps } from "../../utils/types/finance";
import { fromSubscriptionPlan } from "../../utils/funcs/finance/subscription";


export type SubscriptionPlanProps = ComponentPrimitiveProps & {
    item: subscriptionPlanProps;
    onSubscribeClick?: (periodicRate: financeTierPeriodicRate) => void;
}

const SubscriptionPlan = (props: SubscriptionPlanProps) => {
    const [periodicRateTab, setRecurrenceTab] = useState<financeTierPeriodicRate>('monthly');
    const periodicRates: financeTierPeriodicRate[] = ['monthly', 'yearly'];
    const node = fromSubscriptionPlan(props.item, periodicRateTab);
    
    return (
        <div className={`${props.className || ''} cursor-pointer
                ${node.tier ? 'bg-whiteVar5 border-redVar1/[.08]' : 'border-whiteVar2'} p-4 rounded-md border-[2px]
                ${node?.tier === 1 || node?.tier === 2 ? 'bg-pinkVar1' : ''}
            `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-bold text-xl">{node?.title}</div>
                    {
                        node?.tier === 1 || node?.tier === 2 ?
                        <div className="pl-4 flex items-center">
                            {
                                periodicRates.map((periodicRate, i) => (
                                    <div key={i} className={`${i > 0 ? 'ml-2' : ''} capitalize px-3 rounded-md ${periodicRate === periodicRateTab ? 'text-redVar1 bg-redVar1/[.05]' : 'bg-white text-grayVar9'}`} onClick={() => setRecurrenceTab(periodicRate)}>
                                        {periodicRate}
                                    </div>
                                ))
                            }
                        </div> :
                        undefined
                    }
                </div>
                <Button theme={node?.tier === 1 || node?.tier === 2 ? 'pink' : 'red'} className="uppercase px-4 !py-2">
                    {
                        node?.tier === 1 ? 'paid tier 1' :
                        node?.tier === 2 ? 'paid tier 2' :
                        'free plan'
                    }
                </Button>
            </div>
            {
                node?.tier ?
                <div>
                    <div className="my-4 flex items-end">
                        <div className="">
                            <span className="text-4xl font-bold">
                                ${node.price}
                            </span>
                            <span className="pl-1 text-grayVar8">
                                {`/${periodicRateTab}`}
                            </span>
                        </div>
                        {
                            node.originalPrice ?
                            <div className="ml-4 line-through text-grayVar8/[.8] text-2xl font-semibold">
                                ${node.originalPrice}
                            </div> : undefined
                        }
                    </div>
                    <Button
                        theme="red"
                        className="w-full rounded-md"
                        onClick={() => {
                            if(props.onSubscribeClick) props.onSubscribeClick(periodicRateTab);
                        }}
                    >
                        Subscribe to {node?.title}
                    </Button>
                </div> : undefined
            }
            <div className="mt-5">
                <div className="text-grayVar9">Benefits</div>
                <div className="mt-4">
                    {
                        node?.benefits?.map((benefit, i) => (
                            <div key={i} className="flex my-4">
                                <IconWrapper svgAssetName="Check" className="rounded-full p-1" theme="pink" />
                                <div className="pl-2">
                                    <span className="font-semibold">{benefit.title}: </span>
                                    <span>{benefit.text}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlan;