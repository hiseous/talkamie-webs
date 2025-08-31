'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetTransactionApi } from "../../utils/api/finance/get-transaction";

export type FinanceCheckoutContextType = ReturnType<typeof useFinanceCheckoutContext> | undefined;
export const useFinanceCheckoutContext = () => {
    const getApi = useGetTransactionApi();
    const searchParams = useSearchParams();
    const itemId = searchParams.get('transactionId') || undefined;

    useEffect(() => {
        if(itemId){
            getApi.trigger({
                id: itemId,
            });
        }
    }, [itemId]);

    return {
        ...getApi,
    };
}