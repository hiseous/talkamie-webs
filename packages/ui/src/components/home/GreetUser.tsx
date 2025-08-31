'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { getNamesFromFullName } from "../../utils/funcs/string/name";
import { sayGreetings } from "../../utils/funcs/time/greeting";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { numberMayFloat } from "../../utils/funcs/digit/round-number";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import RechargeCoinsModal from "./RechargeCoinsModal";
import ImageAsset from "../../assets/images/ImageAsset";

type GreetUserProps = ComponentPrimitiveProps & {
    
};

const GreetUser = (props: GreetUserProps) => {
    const localUser = useLocalUser();
    const popUp = usePopUp();
    
    return (
        <div className={`${props.className || ''} lg:flex items-center`}>
            <div className="xl:text-xl">
                <span className="text-blackVar4">{sayGreetings().greeting}, </span>
                <span className="font-bold"> {getNamesFromFullName(localUser?.name).firstName}</span>
            </div>
            {
                (
                    localUser?.type === 'senior'
                    || (localUser?.type === 'volunteer' && localUser.ledger?.coins?.balance)
                ) ?
                <div className="lg:ml-4 flex items-center">
                    <ImageAsset
                        name="coinRedPng"
                        className="w-[32px] h-[32px]"
                    />
                    <div className="pl-1 font-bold">
                        Talk Coins: {numberMayFloat((localUser?.ledger?.coins?.balance ?? 0), 2, false)}
                    </div>
                    {
                        (localUser?.type === 'senior' && (localUser?.ledger?.coins?.balance ?? 0) < 5000) ?
                        <div
                            className="ml-3 text-redVar1 hover:underline cursor-pointer"
                            onClick={() => {
                                popUp?.set({
                                    nodes: [
                                        <RechargeCoinsModal />,
                                    ],
                                })
                            }}
                        >
                            Recharge
                        </div> : undefined
                    }
                </div> : <></>
            }
        </div>
    );
}

export default GreetUser;