// 'use client';

// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import HeadingText from "../heading/HeadingText";
// import ModalWrapper from "../modal/ModalWrapper";
// import { usePopUp } from "../pop-up-provider/usePopUpContext";
// import Button from "../button/Button";
// import { useEffect, useState } from "react";
// import { useInitiateBalanceTopUpApi } from "../../utils/api/finance/initiate-top-up";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { roundNumber } from "../../utils/funcs/digit/round-number";
// import { parseAndValidateNumber } from "../../utils/funcs/digit";
// import { __minWithdrawableCents } from "../../utils/constants/digits/finance";
// import InputText from "../input-text/InputText";

// type states = {
//     usd?: number; //not in cents, but usd;
//     // blurred?: boolean;
//     error?: string;
//     validated?: boolean;
//     // showError?: boolean;
// }
// type InitiateWithdrawalModalProps = ComponentPrimitiveProps & {
    
// };

// const InitiateWithdrawalModal = (props: InitiateWithdrawalModalProps) => {
//     const initiateApi = useInitiateBalanceTopUpApi();
//     const popUp = usePopUp();
//     const localUser = useLocalUser();
//     const [states, setStates] = useState<states>({});

//     const handles = {
//         onChange: (value?: string) => {
//             setStates(prev => {
//                 if(value){
//                     prev.usd = roundNumber(parseAndValidateNumber(value) ?? 0, 2, false);
//                     const usdInCent = prev.usd * 100;
                    
//                     if(usdInCent < __minWithdrawableCents){
//                         prev.error = `minimum withdrawable fund is $${roundNumber(__minWithdrawableCents / 100, 2, false)}`;
//                     }
//                     else if((prev.usd * 100) > (localUser?.ledger?.funds?.balance ?? 0)){
//                         prev.error = `you can't withdraw more than your available balance`;
//                     }
//                     else {
//                         prev.error = undefined;
//                     }
//                 }
//                 else {
//                     prev.usd = undefined;
//                     prev.error = `enter an amount to withdraw`;
//                 }

//                 prev.validated = prev.error ? false : true;

//                 return {...prev};
//             });
//         },
//     };

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
//                 Withdrawal
//             </HeadingText>
//             <div className="mt-8">
//                 <div className="">
//                     <div className="text-xl text-grayVar8 capitalize font-bold">
//                         Available balance:
//                         <span> ${roundNumber((localUser?.ledger?.funds?.balance ?? 0) / 100, 2, false)}</span>
//                     </div>
//                     <div className="flex items-center text-6xl text-grayVar5 font-bold">
//                         <div>
//                             $
//                         </div>
//                         <InputText
//                             theme="white"
//                             placeholder={`${roundNumber(__minWithdrawableCents / 100, 2, false)}`}
//                             type="number"
//                             className="!pl-1"
//                             value={typeof states.usd === 'number' ? `${roundNumber(states.usd, 2, false)}` : ''}
//                             // step={0.01}
//                             min={0}
//                             onChange={handles.onChange}
//                         />
//                     </div>
//                     {
//                         states.error ?
//                         <div className="text-redVar1 text-center">
//                             {states.error}
//                         </div> : undefined
//                     }
//                 </div>
//                 <Button
//                     theme="red"
//                     className="w-full rounded-md mt-7"
//                     loading={initiateApi.loading}
//                     disabled={!states.validated}
//                     onClick={() => {
//                         // initiateApi.trigger({
//                         //     body: {
//                         //         periodicRate: props.periodicRate,
//                         //         recurring,
//                         //         tier: props.plan.tier,
//                         //         transactionId: initiateApi.data?.transaction?.id,
//                         //     },
//                         // });
//                     }}
//                 >
//                     Proceed
//                 </Button>
//                 <div className="text-grayVar8 mt-1 text-center">
//                     You shall be redirected to the payment gateway!
//                 </div>
//             </div>
//         </ModalWrapper>
//     );
// }

// export default InitiateWithdrawalModal;