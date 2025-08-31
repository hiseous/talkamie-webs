'use client';

import { useEffect } from "react";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { useSearchParams } from "next/navigation";
import { apiFinanceSubpath } from "../../utils/types/api";
import ControlledTabs from "../node/ControlledTabs";
import { __routes } from "../../utils/constants/app-routes";
import AccountFinanceTransactionItemsTemplate from "./AccountFinanceTransactionItemsTemplate";

const AccountFinanceHistoryPage = () => {
    const dashboard = useDashboard();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab') as apiFinanceSubpath | undefined;
    const tab: apiFinanceSubpath | undefined= (['earnings', 'withdrawals'] as (apiFinanceSubpath | undefined)[]).includes(tabParam) ? tabParam : 'earnings';

    useEffect(() => {
        dashboard?.body.addScrollEvent();
        return () => dashboard?.body.removeScrollEvent();
    }, []);
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Transaction History
            </HeadingAndBackButtonVar1>
            <div className="mt-4">
                <ControlledTabs
                    tabs={[
                        {label: 'Earnings', value: 'earnings', href: __routes.settings(['finance', 'history'], {tab: 'earnings'})},
                        {label: 'Withdrawals', value: 'withdrawals', href: __routes.settings(['finance', 'history'], {tab: 'withdrawals'})},
                    ]}
                    className="my-8"
                    value={tab}
                />
                <AccountFinanceTransactionItemsTemplate
                    focused={!tab || tab === 'earnings'}
                    currentTab={tab}
                    hook={dashboard?.transactionEarnings}
                />
                <AccountFinanceTransactionItemsTemplate
                    focused={tab === 'withdrawals'}
                    currentTab={tab}
                    hook={dashboard?.transactionWithdrawals}
                />
            </div>
        </>
    );
}

export default AccountFinanceHistoryPage;