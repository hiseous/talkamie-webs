import { useGetTransactionsApi } from "../../utils/api/finance/get-transactions";
import { useGetObjectItems } from "../../utils/funcs/hooks/useGetObjectItems";
import { apiFinanceSubpath } from "../../utils/types/api";

type useDashTransactionsProps = {
    tab?: apiFinanceSubpath;
}

export const useDashTransactions = (props?: useDashTransactionsProps) =>  {
    const getHook = useGetObjectItems({
        getApi: useGetTransactionsApi,
    });
    const handles = {
        get: () => {
            getHook.get({
                triggerProps: {
                    subpath: props?.tab,
                },
            });
        },
    };
    
    return {
        ...getHook,
        ...handles,
    };
};