'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { __routes } from "../../utils/constants/app-routes";
import { numberMayFloat } from "../../utils/funcs/digit/round-number";
import Button from "../button/Button";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import RechargeCoinsModal from "../home/RechargeCoinsModal";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { usePopUp } from "../pop-up-provider/usePopUpContext";

const AccountPurchasePage = () => {
    const localUser = useLocalUser();
    const popUp = usePopUp();
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Direct Purchase
            </HeadingAndBackButtonVar1>
            <div className="mt-4">
                <div className="bg-gradient-to-r from-blackVar9 to-grayVar11 p-6 rounded-md text-white">
                    <div>
                        <span>TALK COIN</span>
                        <span className="text-[gray]"> (Balance)</span>
                    </div>
                    <div className="mt-16 flex items-center">
                        <ImageAsset
                            name="coinPinkPng"
                            className="mt-1 w-[40px] h-[40px]"
                        />
                        <div className="pl-2 font-bold text-3xl md:text-4xl">
                            {numberMayFloat((localUser?.ledger?.coins?.balance ?? 0), 2, false)}
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-redVar1 font-semibold text-center">
                     Standard Purchase Rate: $1.00 = 100 TALK COIN
                </div>
                <Button
                    theme="red"
                    className="mt-8 w-full"
                    onClick={() => {
                        popUp?.set({
                            nodes: [
                                <RechargeCoinsModal />,
                            ],
                        })
                    }}
                >
                    Make Purchase
                </Button>
                <NodeMayBeLink href={__routes.settings(['finance', 'purchase', 'history'])} className="text-center hover:underline block mt-4">
                    View purchase history
                </NodeMayBeLink>
            </div>
        </>
    );
}

export default AccountPurchasePage;