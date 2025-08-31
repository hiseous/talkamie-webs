
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { subscriptionPlan } from "../../utils/types/subscription";

// export type SubscriptionPlanProps = ComponentPrimitiveProps & {
//     plan: subscriptionPlan;
//     upgraded?: boolean;
//     isCurrentPlan?: boolean;
// }

// const SubscriptionPlan = (props: SubscriptionPlanProps) => {
//     const consts = {
//         priceValueClassName: `text-lg`,
//         priceLabelClassName: `text-grayVar3`,
//     };
    
//     return (
//         <div className={`${props.className || ''} cursor-pointer
//             ${props.upgraded ? 'bg-whiteVar5 border-redVar1/[.08]' : 'border-whiteVar2'} p-4 rounded-md border-[2px]`}
//         >
//             <div className="flex items-center justify-between font-semibold">
//                 <div>
//                     <span className={`${consts.priceValueClassName}`}>{`$${props.plan.price?.monthly ?? 0}`}</span>
//                     <span className={`${consts.priceLabelClassName}`}>/month</span>
//                 </div>
//                 <div>
//                     <span className={`${consts.priceValueClassName}`}>{`$${props.plan.price?.yearly ?? 0}`}</span>
//                     <span className={`${consts.priceLabelClassName}`}>/year</span>
//                 </div>
//             </div>
//             <div className="mt-4 flex items-center">
//                 <div className="text-xl font-semibold">
//                     {props.plan.title}
//                 </div>
//                 {
//                     props.isCurrentPlan || !props.upgraded ?
//                     <div
//                         className={`${props.isCurrentPlan ? 'bg-redVar1 text-white' : 'bg-pinkVar1 text-redVar1'} ml-2 w-[fit-content] h-[fit-content] rounded-full px-2 py-1 text-xs font-semibold`}
//                     >
//                         {props.isCurrentPlan ? `Current plan` : `upgrade plan`}
//                     </div> : <></>
//                 }
//             </div>
//             {
//                 props.plan.benefits?.length ?
//                 <div className="mt-6">
//                     <div className="text-lg font-semibold">Benefits</div>
//                     <div className="mt-1">
//                         {
//                             props.plan.benefits.map((benefit, i) => (
//                                 <div
//                                     key={i}
//                                     className={``}
//                                 >{benefit}</div>
//                             ))
//                         }
//                     </div>
//                 </div> :
//                 <></>
//             }
//         </div>
//     );
// }

// export default SubscriptionPlan;