'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import HeadingText from "../heading/HeadingText";
import ModalWrapper from "../modal/ModalWrapper";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { useInitiateBalanceTopUpApi } from "../../utils/api/finance/initiate-top-up";
import { parseAndValidateNumber } from "../../utils/funcs/digit";
import InputText from "../input-text/InputText";
import { __minBuyableCoins } from "../../utils/constants/digits/finance";

type states = {
    coins?: number;
    // blurred?: boolean;
    error?: string;
    validated?: boolean;
    // showError?: boolean;
}
type RechargeCoinsModalProps = ComponentPrimitiveProps & {

};

const RechargeCoinsModal = (props: RechargeCoinsModalProps) => {
    const initiateApi = useInitiateBalanceTopUpApi();
    const popUp = usePopUp();
    const [states, setStates] = useState<states>({});

    const handles = {
        onChange: (value?: string) => {
            setStates(prev => {
                prev.coins = parseAndValidateNumber(value) ?? 0;
                if(prev.coins < __minBuyableCoins){
                    prev.error = `minimum coin value is ${__minBuyableCoins} TC`;
                    prev.validated = false;
                }
                else {
                    prev.error = undefined;
                    prev.validated = true;
                }
                // prev.showError = (prev.blurred && prev.error) ? true : false;
                // prev.blurred = false;

                return {...prev};
            });
        },
        // onBlur: () => {
        //     setStates(prev => {
        //         prev.blurred = true;

        //         return {...prev};
        //     });
        // }
    };
    
    useEffect(() => {
        if(initiateApi.loading === false && initiateApi.success){
            const redirectUrl = initiateApi.data?.session?.url;
            if(redirectUrl){
                window.location.href = redirectUrl;
            }
        }
    }, [initiateApi.loading]);
    
    return (
        <ModalWrapper
            className={`${props.className || ''}`}
            onClose={popUp?.reset}
        >
            <HeadingText size="xs" className="font-semibold">
                Need more Talk Coins?
            </HeadingText>
            <div className="mt-4">
                <div className="text-grayVar8">
                    Recharge your Talk Coins to continue talking to Amies and enjoying premium features. Pay easily and securely with Stripe
                </div>
                <div className="mt-4 text-redVar1 font-semibold text-center">
                     $1 = 100 Talk Coins.
                </div>
                <InputText
                    theme="white"
                    placeholder="how much coins?"
                    type="number"
                    onChange={handles.onChange}
                    // onBlur={handles.onBlur}
                />
                {
                    states.error ?
                    <div className="text-redVar1 text-center">
                        {states.error}
                    </div> : undefined
                }
                <Button
                    theme="red"
                    className="w-full rounded-md mt-4"
                    loading={initiateApi.loading}
                    disabled={!states.validated}
                    onClick={() => {
                        initiateApi.trigger({
                            body: {
                                coins: states.coins,
                                transactionId: initiateApi.data?.transaction?.id,
                            },
                        });
                    }}
                >
                    Recharge
                </Button>
            </div>
        </ModalWrapper>
    );
}

export default RechargeCoinsModal;