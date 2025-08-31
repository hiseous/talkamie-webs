'use client';

import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useAccountPasswordPage } from "./useAccountPasswordPage";

const AccountPasswordPage = () => {
    const hook = useAccountPasswordPage();
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Change Password
            </HeadingAndBackButtonVar1>
            <div className="max-w-[600px]">
                {hook.stepNode}
            </div>
        </>
    );
}

export default AccountPasswordPage;