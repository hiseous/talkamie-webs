'use client';

import { useLocalUser } from "../local-user-provider/useLocalUser";
import AccountFinanceSeniorPage from "./AccountFinanceSeniorPage";
import AccountFinanceVolunteerPage from "./AccountFinanceVolunteerPage";

const AccountFinancePage = () => {
    const localUser = useLocalUser();
    
    return (
        <>
            {
                localUser?.type === 'senior' ?
                <AccountFinanceSeniorPage /> :
                <AccountFinanceVolunteerPage />
            }
        </>
    );
}

export default AccountFinancePage;