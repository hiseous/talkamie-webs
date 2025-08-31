import { __apiUrls } from "../../constants/api-urls";
import { apiFinanceSubpath } from "../../types/api";
import { transactionProps } from "../../types/finance";
import { queryPaginationProps } from "../../types/global.types";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";

type triggerProps = {
    subpath?: apiFinanceSubpath;
    query?: queryPaginationProps;
}

export const useGetTransactionsApi = (props?: useFetchApiProps) => {

    const api = useFetchApi<transactionProps[]>({
        ...props,
        fallBackToastError: `could not get transactions`,
    });
    
    const handle = {
        trigger: (triggerProps?: triggerProps) => {
            // console.log('------trig', triggerProps)
            api.trigger({
                url: __apiUrls.finance(['transactions', ...(triggerProps?.subpath ? [triggerProps.subpath] : [])]),
                body: triggerProps?.query,
            });
        },
    };
    
    return {
        ...api,
        ...handle,
    };
}