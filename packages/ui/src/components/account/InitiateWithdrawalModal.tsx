'use client';

import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import HeadingText from "../heading/HeadingText";
import ModalWrapper from "../modal/ModalWrapper";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { numberMayFloat, roundNumber } from "../../utils/funcs/digit/round-number";
import { parseAndValidateNumber } from "../../utils/funcs/digit";
import { __minWithdrawableCoins } from "../../utils/constants/digits/finance";
import InputText from "../input-text/InputText";
import { useWithdrawCoinsApi, withdrawCoinsTriggerProps } from "../../utils/api/finance/withdraw-coins";
import { useRouter } from "next/navigation";
import { __routes } from "../../utils/constants/app-routes";
import InputLabel from "../input-label/InputLabel";
import { __classNames } from "../../utils/constants/classNames";

type form = withdrawCoinsTriggerProps['body'];
type states = {
    form?: form;
    error?: string;
    validated?: boolean;
    // showError?: boolean;
}
type InitiateWithdrawalModalProps = ComponentPrimitiveProps & {
    
};

const InitiateWithdrawalModal = (props: InitiateWithdrawalModalProps) => {
    const initiateApi = useWithdrawCoinsApi();
    const popUp = usePopUp();
    const navigate = useRouter();
    const localUser = useLocalUser();
    const defaultEmail = localUser?.ledger?.paypal?.email || localUser?.email;
    const [states, setStates] = useState<states>({
        form: {
            paypal: {
                email: defaultEmail,
            },
        },
    });

    const handles = {
        onChange: (name: keyof form, value?: valueOf<form>) => {
            setStates(prev => {
                prev.form = {...prev.form};

                if(name === 'coins'){
                    if((typeof value === 'string' || typeof value === 'number')){
                        prev.form.coins = roundNumber(parseAndValidateNumber(value) ?? 0, 2, false);
                        if(prev.form.coins < __minWithdrawableCoins){
                            prev.error = `minimum withdrawable coins is ${roundNumber(__minWithdrawableCoins, 2, false)}TC`;
                        }
                        else if((prev.form.coins) > (localUser?.ledger?.coins?.balance ?? 0)){
                            prev.error = `you can't withdraw more than your available balance`;
                        }
                        else {
                            prev.error = undefined;
                        }
                    }
                    else {
                        prev.form.coins = undefined;
                        prev.error = `enter an amount to withdraw`;
                    }
                }
                else if(name === 'paypal'){
                    if(typeof value === 'object' || typeof value === 'undefined'){
                        prev.form.paypal = {
                            ...value,
                        };
                    }
                }

                if(!prev.error && !prev.form.paypal?.email){
                    prev.error = `your valid PayPal email is required`;
                }

                prev.validated = (
                    prev.error ? false :
                    prev.form.coins && prev.form.paypal?.email ? true :
                    false
                );

                return {...prev};
            });
        },
    };

    useEffect(() => {
        if(initiateApi.loading === false && initiateApi.success){
            const transaction = initiateApi.data?.transaction;
            if(transaction?.id){
                navigate.push(__routes.settings(['finance', `transaction/${transaction.id}`]));
            }
        }
    }, [initiateApi.loading]);
    
    return (
        <ModalWrapper
            className={`${props.className || ''}`}
            onClose={popUp?.reset}
        >
            <HeadingText size="xs" className="font-semibold">
                Withdrawal
            </HeadingText>
            <div className="mt-8">
                <div className="">
                    <InputLabel>
                        Available balance:
                        <span> TC {numberMayFloat((localUser?.ledger?.coins?.balance ?? 0), 2, false)}</span>
                    </InputLabel>
                    <div className={`flex items-center text-grayVar5 font-bold ${__classNames.inputVar1} !p-4`}>
                        <div>
                            TC
                        </div>
                        <InputText
                            // theme="white"
                            placeholder={`${numberMayFloat(__minWithdrawableCoins, 2, false)}`}
                            type="number"
                            className="!p-0 !pl-1"
                            value={typeof states.form?.coins === 'number' ? `${numberMayFloat(states.form?.coins, 2, false)}` : ''}
                            // step={0.01}
                            min={0}
                            onChange={(value) => {
                                handles.onChange('coins', value);
                            }}
                        />
                    </div>
                    <div className="mt-4 text-grayVar5">
                        <InputLabel>
                            Your PayPal email address.
                        </InputLabel>
                        <InputText
                            theme="white"
                            placeholder="Your valid PayPal email address"
                            defaultValue={defaultEmail}
                            onChange={(value) => {
                                handles.onChange('paypal', {email: value});
                            }}
                        />
                    </div>
                    {
                        states.error ?
                        <div className="text-redVar1 text-center">
                            {states.error}
                        </div> : undefined
                    }
                </div>
                <Button
                    theme="red"
                    className="w-full rounded-md mt-7"
                    loading={initiateApi.loading}
                    disabled={!states.validated}
                    onClick={() => {
                        initiateApi.trigger({
                            body: {
                                coins: states.form?.coins,
                                paypal: states.form?.paypal,
                                transactionId: initiateApi.data?.transaction?.id,
                            },
                        });
                    }}
                >
                    Withdraw
                </Button>
            </div>
        </ModalWrapper>
    );
}

export default InitiateWithdrawalModal;