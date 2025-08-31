'use client';

import Button from "../button/Button";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import InitiateWithdrawalModal from "./InitiateWithdrawalModal";

const AccountFinanceManagementPage = () => {
    const localUser = useLocalUser();
    const popUp = usePopUp();
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Manage account
            </HeadingAndBackButtonVar1>
            <div className="mt-4">
                <div>
                    <div>Monthly Withdrawal Limit</div>
                    <div>
                        Your monthly withdrawal limit is the maximum you can withdraw from your
                        Talkamie account in 30 days for security and compliance.
                        Your current limit is $500.
                    </div>
                </div>
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
            </div>
        </>
    );
}

export default AccountFinanceManagementPage;