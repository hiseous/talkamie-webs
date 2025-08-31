// 'use client';

// import { useEffect } from "react";
// import { useGetSubscriptionsApi } from "../../utils/api/finance/get-subscriptions";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import SubscriptionPlan from "./SubscriptionPlan";
// import { subscriptionPlanProps } from "../../utils/types/finance";
// import { usePopUp } from "../pop-up-provider/usePopUpContext";
// import InitiateSubscriptionModal from "./InitiateSubscriptionModal";

// type SubscriptionPlansProps = ComponentPrimitiveProps & {

// }

// const SubscriptionPlans = (props: SubscriptionPlansProps) => {
//     const popUp = usePopUp();
//     const getApi = useGetSubscriptionsApi();
//     const items: subscriptionPlanProps[] = [
//         {}, //free plan;
//         ...getApi.data || [],
//     ];

//     useEffect(() => {
//         getApi.trigger();
//     }, []);

//     return (
//         <div className={`${props.className || ''}`}>
//             {
//                 items.map((item, i) => {
//                     return (
//                         <SubscriptionPlan
//                             key={i}
//                             item={item}
//                             // upgraded={i === 0}
//                             // isCurrentPlan={i === 0}
//                             className={`${i > 0 ? 'mt-8' : ''}`}
//                             onSubscribeClick={(periodicRate) => {
//                                 popUp?.set({
//                                     nodes: [
//                                         <InitiateSubscriptionModal
//                                             plan={item}
//                                             periodicRate={periodicRate}
//                                         />,
//                                     ],
//                                 });
//                             }}
//                         />
//                     )
//                 })
//             }
//         </div>
//     );
// }

// export default SubscriptionPlans;