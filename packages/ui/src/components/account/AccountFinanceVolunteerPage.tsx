'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { __routes } from "../../utils/constants/app-routes";
import { numberMayFloat } from "../../utils/funcs/digit/round-number";
import Button from "../button/Button";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import InitiateWithdrawalModal from "./InitiateWithdrawalModal";

const AccountFinanceVolunteerPage = () => {
    const localUser = useLocalUser();
    const popUp = usePopUp();
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Wallet
            </HeadingAndBackButtonVar1>
            <div className="mt-4 max-w-[1000px]">
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
                            {numberMayFloat((localUser?.ledger?.coins?.balance ?? 0), 2)}
                        </div>
                    </div>
                </div>
                {/* <div className="bg-gradient-to-r from-blackVar9 to-grayVar11 p-6 rounded-md text-white">
                    <div>
                        <div>
                            <span className="font-medium text-xl">Coins</span>
                            <span className=""> (Earning Balance)</span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <Icon
                                iconName="Coin"
                                className="fill-redVar1 mt-1"
                            />
                            <div className="pl-2 font-bold text-2xl">
                                {roundNumber((localUser?.ledger?.coins?.balance ?? 0), 2)}
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 bg-grayVar11 border-0 h-[2px] rounded-md" />
                    <div className="">
                        <div>
                            USD Balance
                        </div>
                        <div className="mt-2 flex items-center font-semibold">
                            $<span className="text-xl">{roundNumber((localUser?.ledger?.funds?.balance ?? 0) / 100, 2).toFixed(2)}</span>
                        </div>
                    </div>
                </div> */}
                <Button
                    theme="red"
                    className="mt-8 w-full"
                    disabled={!localUser?.ledger?.coins?.balance}
                    onClick={() => {
                        popUp?.set({
                            nodes: [
                                <InitiateWithdrawalModal />,
                            ],
                        })
                    }}
                >
                    Withdraw
                </Button>
                {/* <Button
                    theme="pink"
                    className="mt-2 w-full block text-center"
                    href={__routes.settings(['finance', 'manage'])}
                >
                    Manage account
                </Button> */}
                <NodeMayBeLink href={__routes.settings(['finance', 'history'])} className="text-center hover:underline block mt-4">
                    View transaction history
                </NodeMayBeLink>
            </div>
        </>
    );
}

export default AccountFinanceVolunteerPage;