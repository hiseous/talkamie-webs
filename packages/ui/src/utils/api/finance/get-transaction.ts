import { __apiUrls } from "../../constants/api-urls";
import { transactionProps } from "../../types/finance";
import { itemId } from "../../types/global.types";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";

type triggerProps = {
    id: itemId;
}
type respData = {
    transaction?: transactionProps;
}

export const useGetTransactionApi = (props?: useFetchApiProps) => {

    const api = useFetchApi<respData>({
        ...props,
        fallBackToastError: `could not get transaction`,
    });
    
    const handle = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.finance([`transaction/${triggerProps.id}`]),
            });
        },
    };
    
    return {
        ...api,
        ...handle,
    };
}