// 'use client';

// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import HeadingText from "../heading/HeadingText";
// import ModalWrapper from "../modal/ModalWrapper";
// import { usePopUp } from "../pop-up-provider/usePopUpContext";
// import Button from "../button/Button";
// import { financeTierPeriodicRate, subscriptionPlanProps } from "../../utils/types/finance";
// import { fromSubscriptionPlan } from "../../utils/funcs/finance/subscription";
// import { useEffect, useState } from "react";
// import ControlledCheckbox from "../checkbox/ControlledCheckbox";
// import { useInitiateSubscriptionApi } from "../../utils/api/finance/initiate-subscription";

// type InitiateSubscriptionModalProps = ComponentPrimitiveProps & {
//     plan: subscriptionPlanProps;
//     periodicRate: financeTierPeriodicRate;
// };

// const InitiateSubscriptionModal = (props: InitiateSubscriptionModalProps) => {
//     const initiateApi = useInitiateSubscriptionApi();
//     const popUp = usePopUp();
//     const node = fromSubscriptionPlan(props.plan, props.periodicRate);
//     const [recurring, setRecurring] = useState(false);

//     useEffect(() => {
//         if(initiateApi.loading === false && initiateApi.success){
//             const redirectUrl = initiateApi.data?.session?.url;
//             if(redirectUrl){
//                 window.location.href = redirectUrl;
//             }
//         }
//     }, [initiateApi.loading]);
    
//     return (
//         <ModalWrapper
//             className={`${props.className || ''}`}
//             onClose={popUp?.reset}
//         >
//             <HeadingText size="xs" className="font-semibold">
//                 Subscribe to {props.plan.name}
//             </HeadingText>
//             <div className="mt-8 text-center">
//                 <div className="">
//                     <div className="text-xl text-grayVar8 capitalize font-bold">
//                         tier {props.plan.tier}
//                     </div>
//                     <div className="mt-3 text-6xl font-bold">
//                         ${node.price}
//                     </div>
//                     <div className="mt-3 text-xl text-grayVar8 capitalize font-bold">
//                         {props.periodicRate} plan
//                     </div>
//                     {
//                         node.originalPrice ?
//                         <div className="mt-3 line-through text-grayVar8/[.8] text-4xl font-semibold">
//                             ${node.originalPrice}
//                         </div> : undefined
//                     }
//                     <div
//                         className="mt-8 flex justify-center cursor-pointer"
//                         onClick={() => setRecurring(!recurring)}
//                     >
//                         <ControlledCheckbox
//                             checked={recurring}
//                             size={24}
//                         />
//                         <div className="-mt-2 ml-3 text-start text-grayVar8">
//                             <div className="font-semibold text-lg">
//                                 Make this a recurring payment
//                             </div>
//                             <div>
//                                 {
//                                     props.periodicRate === 'monthly' ? `you will be billed monthly` :
//                                     `subscription will be renewed anually`
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Button
//                     theme="red"
//                     className="w-full rounded-md mt-7"
//                     loading={initiateApi.loading}
//                     onClick={() => {
//                         initiateApi.trigger({
//                             body: {
//                                 periodicRate: props.periodicRate,
//                                 recurring,
//                                 tier: props.plan.tier,
//                                 transactionId: initiateApi.data?.transaction?.id,
//                             },
//                         });
//                     }}
//                 >
//                     Proceed
//                 </Button>
//                 <div className="text-grayVar8 mt-1">
//                     You shall be redirected to the payment gateway!
//                 </div>
//             </div>
//         </ModalWrapper>
//     );
// }

// export default InitiateSubscriptionModal;