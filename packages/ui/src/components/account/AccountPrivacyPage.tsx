'use client';

import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import HeadingText from "../heading/HeadingText";
import PrivacyOptions from "./PrivacyOptions";

const AccountPrivacyPage = () => {
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Privacy
            </HeadingAndBackButtonVar1>
            <div className="max-w-[800px]">
                <HeadingText size="xs" className="font-semibold">
                    Control profile visibility
                </HeadingText>
                <div className="text-lg">
                    Decide who can view your profile to ensure a comfortable and secure experience.
                </div>
                <PrivacyOptions className="mt-8" />
            </div>
        </>
    );
}

export default AccountPrivacyPage;